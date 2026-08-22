# Antibiotic Regulator

Antibiotic are medicines that kill or slow down growth of bacteria, however, if it is not ensured that the prescribed dose is complete, or self diagnosing your symptoms and deciding to take a pill or two creates a massive problem - Microbial Antibiotic Resistance.
The bacteria in your body, when not fully eliminated by antibiotics- which happens with incomplete doses, or taking antibiotics in viral infections, make the bacteria immune to the specific antibiotic, and hence its generations will also possess the resistance.
Over a period of time, those bacteria can spread from person to person, obtaining more antibiotic resistance on the way, and hence eventually rendering a Superbug; which is a pathogen so powerful no antibiotic works against it, which can lead to it being very hard to eliminate and causing serious global and personal health problems.

## Solution

We aim with this project to regulate the supply of antibiotics, and rather treat it as a luxury, by enclosing the antibiotics a structure, which can only be opened by a prescription by a  doctor in the form of QR code.

A QR code once scanned can't be scanned again, and the machine dispense the right amount of pills for you.

## Technical Details

This whole workflow goes as-
1. We generate a QR code and give it you.
2. The user or the pharmacy scans the QR with a website provided.
3. The Data is then sent over to Adafruit IO - an IoT platform.
4. The data is then fetched into a laptop with a python script.
5. The python script logs the data into a JSON files and also connects to the microcontroller(in our case, on Arduino).
6. Then, if the data matches our conditions and is unique, the microcontroller sweeps a servo the desired number of times.
7. The servo is fixed below a stack of pills and hence it dispenses one pill at a time, though not with a 100% accuracy(I must rather say 20% accuracy, but we will improve the design).
8. The pills get collected in a container below!

### Technologies used 
This utilises the following technologies :
1. HTML
2. CSS
3. JavaScript
4. Python
5. Arduino C

#### To be honest and clear, the python is completely Vibe-Coded, and parts of JS, such as connecting to Adafruit and logic for jsQR are too vibe coded(I have indicated it against the code where its vibe-coded). Other then that, the HTML, CSS and Arduino C was rather easy.
---

A project by Sarthak and Satyam
