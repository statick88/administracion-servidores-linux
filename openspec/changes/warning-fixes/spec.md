# SDD Spec: Fix All WARNING Issues Across Ebook

## Change Name
`warning-fixes`

## Specification Overview
This spec defines the exact fixes needed for each warning type, with file-by-file instructions.

---

## 1. Citation System Fix

### 1.1 Master Bibliography
Create/ensure `references.bib` in project root with all required entries:

```bibtex
@online{statick_ds,
  title = {Diego Saavedra - Professional Profile},
  url = {https://github.com/statick88},
  year = {2026}
}

@online{dns_google,
  title = {Google Public DNS},
  url = {https://developers.google.com/speed/public-dns},
  year = {2026},
  note = {IP: 8.8.8.8, 8.8.4.4}
}

@online{debian2024,
  title = {Debian 12 Bookworm Release Notes},
  url = {https://www.debian.org/releases/bookworm/},
  year = {2024}
}

@online{ubuntu2024,
  title = {Ubuntu 24.04 LTS Release Notes},
  url = {https://discourse.ubuntu.com/t/noble-numbat-release-notes/38451},
  year = {2024}
}

@online{linux2024,
  title = {Linux Kernel Archives},
  url = {https://www.kernel.org/},
  year = {2024}
}

@online{bash_manual,
  title = {GNU Bash Manual},
  url = {https://www.gnu.org/software/bash/manual/bash.html},
  year = {2026}
}

@online{cc_by_sa_30,
  title = {Creative Commons Attribution-ShareAlike 3.0 Legal Code},
  url = {https://creativecommons.org/licenses/by-sa/3.0/legalcode},
  year = {2023}
}

@online{pam_linux,
  title = {Linux-PAM Documentation},
  url = {https://linux-pam.org/Linux-PAM-html/},
  year = {2024}
}

@online{sudo_manual,
  title = {Sudoers Manual},
  url = {https://www.sudo.ws/docs/man/1.9.15/sudoers.man.html},
  year = {2024}
}

@online{netplan_docs,
  title = {Netplan Documentation},
  url = {https://netplan.io/documentation/},
  year = {2024}
}

@online{redhat_lvm,
  title = {Red Hat LVM Configuration},
  url = {https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/9/html/configuring_and_managing_logical_volumes/},
  year = {2024}
}

@online{fail2ban_wiki,
  title = {Fail2Ban Wiki},
  url = {https://github.com/fail2ban/fail2ban/wiki},
  year = {2024}
}

@online{mysql_mysqldump,
  title = {MySQL mysqldump Documentation},
  url = {https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html},
  year = {2024}
}

@online{mysql_grant,
  title = {MySQL GRANT Statement},
  url = {https://dev.mysql.com/doc/refman/8.0/en/grant.html},
  year = {2024}
}

@online{digitalocean_troubleshooting,
  title = {Linux Troubleshooting Commands},
  url = {https://www.digitalocean.com/community/tutorials/linux-troubleshooting-commands},
  year = {2024}
}

@online{redhat_monitoring,
  title = {RHEL Monitoring Guide},
  url = {https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html/monitoring_and_managing_system_status_and_performance/},
  year = {2024}
}

@online{debian_user_groups,
  title = {Debian User and Group Management},
  url = {https://www.debian.org/doc/manuals/debian-handbook/sect.user-group-management.es.html},
  year = {2024}
}

@online{windows_sam,
  title = {Windows Security Accounts Manager},
  url = {https://learn.microsoft.com/en-us/windows/win32/secauthn/security-accounts-manager},
  year = {2024}
}

@online{linuxjourney,
  title = {Linux Journey},
  url = {https://linuxjourney.com/},
  year = {2024}
}

@online{viemu,
  title = {Visual Vim Tutorial},
  url = {https://www.viemu.com/a_vi_vim_graphical_cheat_sheet_tutorial.html},
  year = {2024}
}

@online{askubuntu,
  title = {Ask Ubuntu},
  url = {https://askubuntu.com/},
  year = {2024}
}

@online{unix_stackexchange,
  title = {Unix & Linux Stack Exchange},
  url = {https://unix.stackexchange.com/},
  year = {2024}
}

@online{linuxquestions,
  title = {LinuxQuestions.org},
  url = {https://www.linuxquestions.org/},
  year = {2024}
}

@online{terminator,
  title = {Terminator Terminal},
  url = {https://gnometerminator.blogspot.com/},
  year = {2024}
}
```

### 1.2 File-Specific Fixes

| File | Action |
|------|--------|
| `about.qmd` | Add `bibliography: ../references.bib` to YAML |
| `06-redes/index.qmd` | Add `bibliography: ../references.bib`; change citation `1.1.1.1` to `dns_google` |
| `unidades/unidad13/*.qmd` (4 files) | Add `bibliography: ../../references.bib`; ensure citations match bib keys |

---

## 2. Code Annotation Fix

### 2.1 Pattern Standard
**Use unique annotation ranges per code block within each document:**
- Block 1: `# <101>`, `# <102>`, ... 
- Block 2: `# <201>`, `# <202>`, ...
- Block 3: `# <301>`, `# <302>`, ...

**Explanation lists must immediately follow their code block** (no intervening callouts, tables, or other content).

### 2.2 File-Specific Renumbering

#### `01-fundamentos/index.qmd`
| Code Block | Current Range | New Range | Explanation Lines |
|------------|---------------|-----------|-------------------|
| Windows WSL setup | 1-4 | 101-104 | Lines 97-100 |
| Linux verification | 1-3 | 201-203 | Lines 104-106 |
| Docker verification | 1-2 | 301-302 | Lines 124-125 |
| Terminal basics | 1-7 | 401-407 | Lines 164-170 |
| Navigation | 1-8 | 501-508 | Lines 222-229 |
| Permissions/ACLs | 1-11 | 601-611 | Lines 262-272 |
| Editors (nano/vim) | 1-3 | 701-703 | Need to add explanations |
| Package management | 1-9 | 801-809 | Lines 314-322 |
| Lab evidence | 1-2 | 901-902 | Need to add explanations |

#### `02-paquetes/index.qmd`
| Code Block | Current Range | New Range |
|------------|---------------|-----------|
| CRB enable | 2 | 101 |
| Snap certbot | 2 | 201 |

#### `unidades/unidad12/2_logs_journalctl.qmd`
| Code Block | Current Range | New Range |
|------------|---------------|-----------|
| journalctl config | 2-4 | 101-103 |
| journalctl rotate | 3 | 201 |

#### `unidades/unidad12/3_red_puertos_dns.qmd`
| Code Block | Current Range | New Range |
|------------|---------------|-----------|
| MariaDB bind | 1 | 101 |
| dig trace | 1 | 201 |
| flush-caches | 2 | 301 |

#### `unidades/unidad12/4_recursos_sistema_storage.qmd`
| Code Block | Current Range | New Range |
|------------|---------------|-----------|
| production warning | 2 | 101 |

---

## 3. Broken Link Fixes

### 3.1 Link Replacements

| File | Broken URL | Replacement URL | Status |
|------|------------|-----------------|--------|
| `license.qmd` | creativecommons.org/licenses/by-sa/3.0/legalcode.es | https://creativecommons.org/licenses/by-sa/3.0/legalcode | 200 OK |
| `01-fundamentos/index.qmd` | discourse.ubuntu.com/t/noble-numbat-release-notes/30831 | https://discourse.ubuntu.com/t/noble-numbat-24-04-release-notes/38451 | 200 OK |
| `04-usuarios/index.qmd` | linux-pam.org/Linux-PAM-html/ | https://linux-pam.org/Linux-PAM-html/ | 200 OK |
| `04-usuarios/index.qmd` | sudo.ws/docs/man/1.9.15/sudoers.man.html | https://www.sudo.ws/docs/man/1.9.15/sudoers.man.html | 200 OK |
| `06-redes/index.qmd` | netplan.io/docs/ | https://netplan.io/documentation/ | 200 OK |
| `06-redes/index.qmd` | access.redhat.com/.../configuring_and_managing_logical_volumes/ | https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/9/html/configuring_and_managing_logical_volumes/ | 200 OK (may need 403 handling) |
| `07-seguridad/index.qmd` | fail2ban.org/wiki/index.php/Main_Page | https://github.com/fail2ban/fail2ban/wiki | 200 OK |
| `09-nginx/index.qmd` | discourse.ubuntu.com/t/noble-numbat-release-notes/30831 | https://discourse.ubuntu.com/t/noble-numbat-24-04-release-notes/38451 | 200 OK |
| `11-bases-datos/index.qmd` | dev.mysql.com/doc/refman/8.0/en/mysqldump.html | https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html | 200 OK (403 may persist) |
| `11-bases-datos/index.qmd` | dev.mysql.com/doc/refman/8.0/en/grant.html | https://dev.mysql.com/doc/refman/8.0/en/grant.html | 200 OK (403 may persist) |
| `unidades/unidad12/5_lab_practico_troubleshooting.qmd` | digitalocean.com/community/tutorials/linux-troubleshooting-commands | https://www.digitalocean.com/community/tutorials/linux-troubleshooting-commands | 200 OK |
| `unidades/unidad12/5_lab_practico_troubleshooting.qmd` | access.redhat.com/.../monitoring_and_managing_system_status_and_performance/ | https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html/monitoring_and_managing_system_status_and_performance/ | 200 OK (403 may persist) |
| `unidades/unidad13/99_recursos.qmd` (8 links) | Various | See spec below | Various |

### 3.2 Unidad 13 Recursos - Detailed Fixes

| # | Current Link | Replacement | Notes |
|---|--------------|-------------|-------|
| 1 | debian.org/doc/manuals/debian-handbook/sect.user-group-management.es.html | https://www.debian.org/doc/manuals/debian-handbook/sect.user-group-management.html | English version works |
| 2 | learn.microsoft.com/en-us/windows/win32/secauthn/manager | https://learn.microsoft.com/en-us/windows/win32/secauthn/security-accounts-manager | Corrected path |
| 3 | linuxjourney.com/ | https://linuxjourney.com/ | 403 - use archive.org or remove |
| 4 | viemu.com/ | https://www.viemu.com/a_vi_vim_graphical_cheat_sheet_tutorial.html | Direct to tutorial |
| 5 | askubuntu.com/ | https://askubuntu.com/ | 403 - use archive.org or remove |
| 6 | unix.stackexchange.com/ | https://unix.stackexchange.com/ | 403 - use archive.org or remove |
| 7 | linuxquestions.org/ | https://www.linuxquestions.org/ | 403 - use archive.org or remove |
| 8 | gnometerminator.github.io/ | https://gnome-terminator.org/ | Correct project URL |

### 3.3 Red Hat Links (403 Forbidden)
For Red Hat links that return 403, use archive.org snapshots or public alternative documentation:
- Replace with archive.org URLs where available
- Or link to CentOS/AlmaLinux/Rocky Linux equivalent docs (public)
- Or use kernel.org / freedesktop.org equivalents

---

## 4. Fenced Div Fixes (Unidad 13)

### 4.1 Pattern Issue
The `::: {.panel-tabset}` divs have parsing warnings. Check for:
- Missing closing `:::` 
- Nested divs without proper separation
- Missing blank lines around fenced divs

### 4.2 Fix Pattern
Ensure each panel-tabset has:
```markdown
::: {.panel-tabset}

### Tab Title

#### Sub-tab
Content here

:::
```
With blank lines before opening `:::`, after closing `:::`, and between tabs.

---

## 5. Resource URL Updates

### 5.1 GNU Bash Manual
- **File**: `03-scripting/index.qmd`
- **Current**: `https://www.gnu.org/software/bash/manual/`
- **Fixed**: `https://www.gnu.org/software/bash/manual/bash.html`

---

## Verification Checklist

After implementation, verify:
- [ ] `quarto render` → 0 warnings
- [ ] `quarto check links` → 0 broken links
- [ ] All citations resolve in bibliography
- [ ] All code annotations have matching explanation items
- [ ] All fenced divs render correctly