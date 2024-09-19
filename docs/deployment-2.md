# Dokku Remote Setup

 Configure SSH ControlMaster

Add to `~/.ssh/config`:

```
Host dokku-server
    HostName [your-server-ip]
    User root
    ControlMaster auto
    ControlPath ~/.ssh/control:%h:%p:%r
    ControlPersist 10m
```
