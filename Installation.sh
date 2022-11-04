#!/bin/bash 
#######################################################################
#do we want a service account?
#	not the worst idea
(

# Update apt repository to grab current golang package
sudo add-apt-repository -y ppa:longsleep/golang-backports


#update & upgrade apt-get
sudo apt-get -y update && sudo apt-get -y upgrade

#install available prereqs from apt-get
sudo apt-get -y install curl docker.io docker-compose git golang-go jq nodejs npm

#update npm, is this the correct version? 
#sudo npm install npm@5.6.0 -g

#create allow docker to be used without explicit sudo commands
sudo usermod -a -G docker vivekkukkapalli
# start & enable docker service
sudo systemctl start docker
sudo systemctl enable docker


#grab and execute the Fabric install script
curl -sSL https://bit.ly/2ysbOFE | bash -s 2.4.6

#sanity check 
#if exists -> delete
if [[ -d "/opt/fabric-samples/" ]]; then
	sudo rm -r /opt/fabric-samples/
fi

sudo mv ./fabric-samples/ /opt/.

#might as well try to run the test from the script 
#TODO: insure the output runs correctly and/or we can test the output for correctness
#

# ./network.sh up

# docker ps -a

# ./network.sh down

# Output to a log file at location
)| tee /var/log/env-install.log
