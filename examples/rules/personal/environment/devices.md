# Devices & environment (environment rule example — all placeholders)

> EXAMPLE FILE. This is an "environment" rule: facts about WHERE you work —
> machine paths, hosts, network drives, OS quirks.
>
> ONLY RELEVANT IF you sync ~/.claude/ across multiple devices. On a single
> machine, hardcoding a path here buys you nothing — delete this file.
>
> Every value below is a PLACEHOLDER. Fill in your real values per machine during
> install, and never commit real paths/IPs as literals into shared config — treat
> them as values the install conversation fills in. See docs/03-customization-guide.md
> (Decisions 3 and 4) for the multi-device + sync prerequisite.

## Work hub

- Primary work directory: `<WORK_HUB>`  (e.g. where your projects live on this machine)

## Other machines on the network

> Useful when transferring files or connecting between your own devices.

- Host: `<DEVICE_NAME>`
  - LAN address: `<HOST_IP>`
  - Username: `<USER>`
  - Mounted as: `<MOUNT_POINT>`  (e.g. a drive letter or mount path)
  - SSH: `<ENABLED_OR_NOT>`

## OS / shell notes

> Capture environment-specific quirks here so the model accounts for them.

- Shell: `<YOUR_SHELL>`
- Known quirk: `<DESCRIBE_ANY_OS_OR_SHELL_QUIRK>`

## Sync boundary reminder

This file is SHARED config (it syncs across your machines), but the *values* you
fill in are per-machine. Keep genuinely per-device state (memory, local caches)
OUT of sync via `.gitignore`. See docs/03-customization-guide.md, Decision 4.
