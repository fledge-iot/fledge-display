Name:          fledge-display
Vendor:        Dianomic Systems Inc. <info@dianomic.com>
Version:       __VERSION__
Release:       __RELEASE__
BuildArch:     __ARCH__
Summary:       Fledge Display
License:       Apache License
Group:         IoT
URL:           http://www.dianomic.com
Requires:      nginx
VCS:           __VCS__

%description
Fledge Display


%pre
#!/usr/bin/env bash
echo "Installing Fledge Display"

kill_nginx_ps () {
  PSLIST=$(ps aux | grep '[n]ginx' | awk '{print $2}')
  if [ ! -z "${PSLIST}" ]; then
    kill ${PSLIST}
  fi
}

kill_nginx_ps
systemctl stop nginx


%post
#!/usr/bin/env bash
set -e

start_nginx () {
  systemctl start nginx
  systemctl is-active nginx
}

cp --remove-destination /usr/share/nginx/html/fledge.html /usr/share/nginx/html/index.html
start_nginx

%postun
#!/usr/bin/env bash

PSLIST=$(ps aux | grep '[n]ginx' | awk '{print $2}')
if [ ! -z "${PSLIST}" ]; then
  kill ${PSLIST}
fi

%define _datadir /usr/share/nginx/html
%files
%{_datadir}/*
