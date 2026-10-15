# Navigation cheat sheet

## Finding anything

| Need | How |
| --- | --- |
| Any menu | Click **All** (top left) and type part of its name |
| Any table as a list | Type the table name followed by `.list` into the All search box, for example `alm_license.list` |
| Build name and patch | Add `/stats.do` to the instance address |
| Run a script once | All, **Scripts - Background** (address `/sys.scripts.do`) |
| Scheduled jobs | `sysauto.list`; open a job and click **Execute Now** |
| Group a list | Right-click a column heading, **Group By** |
| Export records as XML | Right-click a column heading, **Export**, **XML** |
| Import records from XML | Right-click a column heading, **Import XML** |
| Update sets | All, **Local Update Sets**; to load one: **Retrieved Update Sets**, **Import Update Set from XML** |
| Elevated rights for scripts | Profile picture, **Elevate role**, tick **security_admin** |

## Software Asset Workspace in Zurich

Open it with All, **Software Asset Workspace**. The **License operations** view groups its lists as follows (labels from the Zurich documentation):

| Group | Lists we use |
| --- | --- |
| Licensing | Software entitlements, Software models, Software installs |
| Administration | Reclamation rules |
| Reclamation | Removal candidates, Reclamation summary |
| Discovery | Discovery models, Software usage |
| Content suggestions | Normalization suggestions, Part number suggestions |

The **License usage** view shows the results per vendor and product, and each product result offers **Remediation options**.

## Tables

| Table | Holds |
| --- | --- |
| `cmdb_sam_sw_install` | Software installations |
| `cmdb_sam_sw_discovery_model` | Discovery models and their normalization status |
| `cmdb_software_product_model` | Software models |
| `alm_license` | Entitlements |
| `alm_entitlement_user`, `alm_entitlement_asset` | Allocations to people and to computers |
| `samp_reconciliation_result`, `samp_software_model_result`, `samp_license_metric_result` | License check results |
| `samp_sw_usage` | Software usage |
| `samp_sw_reclamation_rule`, `samp_sw_reclamation_candidate` | Reclamation rules and removal candidates |
| `cmdb_ci_computer`, `cmdb_ci_win_server`, `cmdb_ci_linux_server` | Laptops and servers |
| `v_plugin` | Installed plugins |

## Plugins and roles

| Item | Meaning |
| --- | --- |
| `com.sn_samp_master_ws` | SAM Professional master plugin with the workspace (Zurich) |
| `com.snc.samp` | SAM Professional core |
| `sn_sam_workspace` | Software Asset Workspace application |
| `com.sn_sam_playbook` | Software Asset Management Guided Experiences, which also installs the workspace |
| `sam_admin`, `sam_user` | SAM administrator and user roles |
| `snc_read_only` | Blocks every create, change and delete |

## Server processor fields

`cpu_count` is the number of processors. `cpu_core_count` is the number of cores per processor. Total cores are the two multiplied.
