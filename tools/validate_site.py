#!/usr/bin/env python3
"""Validate links and required routes in a generated static-site artifact."""

import argparse
import posixpath
import sys
from html.parser import HTMLParser
from pathlib import Path, PurePosixPath
from urllib.parse import urlsplit

UNITS = (
    "01-fundamentos", "02-paquetes", "03-scripting", "04-usuarios",
    "05-procesos", "06-redes", "07-seguridad", "08-dhcp", "09-apache",
    "10-web", "11-bases-datos", "12-rescate-proyecto",
)
MINICOURSES = (
    "nvim", "zsh", "oh-my-zsh", "lazyvim", "herdr", "opencode", "ranger",
    "bash-scripting", "monitoreo", "fallos", "errores", "hardening", "zero-trust",
)
PRODUCTION_ROUTES = (
    "index.html", "recursos.html", "recursos/bandit.html", "recursos/proxmox.html",
    *(f"unidades/{unit}.html" for unit in UNITS),
    "unidades/08-docker.html", "unidades/09-nginx.html", "unidades/10-ssl.html",
    "recursos/minicursos/index.html",
    *(f"recursos/minicursos/{course}.html" for course in MINICOURSES),
)


class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.hrefs = []

    def handle_starttag(self, _tag, attrs):
        self.hrefs.extend(value for name, value in attrs if name in {"href", "src"} and value)


def local_target(source, href):
    """Return an artifact-relative target, or None for an external/fragment URL."""
    url = urlsplit(href)
    if url.scheme or url.netloc or not url.path:
        return None
    if url.path.startswith("/"):
        target = url.path.lstrip("/")
    else:
        target = posixpath.normpath(posixpath.join(PurePosixPath(source).parent.as_posix(), url.path))
    return target


def validate_links(site):
    errors = []
    for page in site.rglob("*.html"):
        source = page.relative_to(site).as_posix()
        parser = Links()
        parser.feed(page.read_text(encoding="utf-8"))
        for href in parser.hrefs:
            target = local_target(source, href)
            if target is None:
                continue
            if target == ".." or target.startswith("../") or not (site / target).is_file():
                errors.append(f"{source}: local link {href!r} does not resolve inside the artifact")
    return errors


def validate(site, production=False):
    errors = []
    if not site.is_dir():
        return [f"Generated site output is missing: {site}"]
    if production:
        errors.extend(f"Missing required production route: {route}"
                      for route in PRODUCTION_ROUTES if not (site / route).is_file())
    errors.extend(validate_links(site))
    return errors


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--site", type=Path, required=True, help="generated artifact directory")
    parser.add_argument("--production", action="store_true",
                        help="require every route deployed from main, including opt-in minicourses")
    args = parser.parse_args()
    errors = validate(args.site.resolve(), args.production)
    if errors:
        print("Site artifact validation failed:", *errors, sep="\n", file=sys.stderr)
        return 1
    print(f"Validated site artifact: {args.site}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
