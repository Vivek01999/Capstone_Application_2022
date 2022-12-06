
<H1> Setting Up the Project


<H1> Installing Fabcar (Blockchain)
<H2>

**MAC**
<H2> => To setup the blockchain network (fabcar) in MAC, please follow the steps mentioned below.

[Install fabcar on MAC](https://dev.to/capriciousrebel/getting-started-with-hyperledger-fabric-on-macos-2937/)

<H2> => Bring up the test network and verify fabcar is installed and running. 
<H2>

<p>

**Windows**
<H2> => To setup the blockchain network (fabcar) in windows, please follow the steps mentioned 

    
1. Install Ubuntu in a Virtual Machine. Instructions can be found [here](https://youtu.be/wjbbl0TTMeo).

2. Once ubuntu is up and running follow the instructions
[here](https://medium.com/@srpillai/step-by-step-guide-to-setup-hyperledger-v2-1-fabcar-sample-on-ubuntu-18-04-338dd39e436d) to install fabcar.

<H2> => Bring up the test network and verify fabcar is installed and running. 
<H1>


**Note: Please do not skip any steps.**


       
<H1>Create Instance in AWS for PostgreSQL

<H2>

1. Install [pgAdmin](https://www.pgadmin.org/download/)

2. Follow the instructions mentioned [here](https://adamtheautomator.com/rds-postgres/) to create an RDS instance and connect it to pgAdmin.

3. Edit the connection string for SQL instance details in BE/MBSE_WebApi/util/db.js

4. Follow the steps to restore the SQL file (Backuped SQL file is attched) [Backup and Restore](https://hevodata.com/learn/pgadmin-backup-database/#12)


<H1>Running the Project

<H2>

1. Before starting the project make sure 
    
    1.1. You are connected to a secured wifi network (Private)  <br>
    1.2. Docker application is up and running <br>
    1.3. DB instance is running on AWS <br>
    1.4. Node is installed

2. Download the [Visual Studio Code](https://code.visualstudio.com/download) and Install. 

3. Blockchain

    2.1. Open CMD <br>
    2.2. Navigate to FABRIC/test-network <br>
    2.3. sudo ./network.sh down <br>
    2.4. Navigate to FABRIC/fabcar <br>
    2.5. ./startFaric.sh <br>

4. Open Visual studio code

5. Open CAPSTONE_APPLICATION_2022 folder in VSCode

6. Open three terminals

    **Terminal 1** 
        <br>=> cd FE <br>
         => npm install <br>
        => ng serve<br>

    **Terminal 2** <br>
        => cd BE/MBSE_WebApi <br>
        => npm install <br>
        => nodemon index.js <br>

    **Terminal 3** <br>
        => cd FABRIC/fabcar/javascript <br>
        => npm install <br>
        => nodemon index.js <br>

7. Open localhost:4200 in your browser to work with the application