/*
1. create a class called Ship with the constructor with the properties of Hull, Firepower and Accuracy (like Factory)
2. write a method called attack which generates a random number(USS Assembly) and compares it with alien's accuracy
    - if random number is greater than Alien's accuracy, then USS Assembly win and reduce the alien's hull with the firepower

    - if random number is lesser than Alien's accuracy, then reduce the USS assembl'y hull by the Alien's firepower
On click of the attack Alien button, the attack function should be called.
attack() - 

        -Check the alien's hull also
        -if alien's hull is lesser than or equal to 0, we have to take the next ship
        else
        -continue with the same ship
        - Check the USS assembly hull 
        If it is greater than 0, then proceed
                -Generate a random number(USS'accuracy) for USS Assembly
                -Compare it with Alien's accuracy
                - if(random_num > alien's accuracy) - decrease the alien's hull by randomnum(USS Accuracy)
                - else - descrease the USS 's hull by the alien's accuracy.
        else
            - we have to end the game.

        

If we are clicking the attack button again, we have to check the alien's hull. If it is less than or equal to 0, then we have to continue with new alinen number
else
we have to take the same alien number

After the 6 alien iterations, we have to check the hull of USS Assembly. If it greater than 0, then diplay "YOU WON"


let lolapi = new lolApi(summoner, region);
lolapi.getSummonerId().then(lolData => console.log(lolData));


let lolapi = new lolApi(summoner, region);
let lolData = lolapi.getSummonerId();
console.log(lolData);

*/

let roundcnt = 0;
let hullcnt;
const attackbtn = document.querySelector(".attackbtn");
const retreatbutton = document.querySelector(".Retreatbtn");

class Ship {
  constructor(hull, firepower, accuracy) {
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
  }
  attack(alienship) {
    let returnval;
    if (alienship.hull > 0 && this.hull > 0) {
      let ussaccuracy = getRandomNumber();
      //alert("USS Accuracy:", ussaccuracy);
      if (ussaccuracy > alienship.accuracy) {
        alienship.hull -= this.firepower;
        document.getElementById("alienhull").textContent = alienship.hull;
        document.getElementById("usshull").textContent = hullcnt;
        //console.log("Alien Hull:", alienship.hull);
      } else {
        this.hull -= alienship.firepower;
        hullcnt = this.hull;
        console.log("USS Hull :", this.hull);
        document.getElementById("usshull").textContent = hullcnt;
        document.getElementById("alienhull").textContent = alienship.hull;
      }
      if (alienship.hull <= 0) {
        document.getElementById("usshull").textContent = hullcnt;
        document.getElementById("alienhull").textContent = alienship.hull;
        alert("ALIEN'S HULL IS OVER, YOU WON THIS ROUND");
        return;
      } else if (this.hull <= 0) {
        document.getElementById("usshull").textContent = hullcnt;
        document.getElementById("alienhull").textContent = alienship.hull;
        alert("YOU GOT HIT AND YOUR HULL IS OVER");
        return;
      } else {
        console.log("Going with the same alien");

        if (
          confirm(
            "YOU GOT HIT, BUT ALIEN STILL SURVIVE. DO YOU WANT TO HIT AGAIN?"
          ) == true
        ) {
          document.getElementById("usshull").textContent = hullcnt;
          document.getElementById("alienhull").textContent = alienship.hull;
          this.attack(alienship);
        } else {
          hullcnt = 0;
          alert("YOU LOST");
        }
      }
    }
  }
}

function getRandomNumber() {
  return Math.round(Math.random() * 10) / 10;
}

function getRandomHull() {
  return Math.floor(Math.random() * 3) + 3;
}

function getRandomFirePower() {
  return Math.floor(Math.random() * 2 + 1) + 2;
}

function getRandomAccuracy() {
  return Math.floor(Math.random() * 0.2) + 0.6;
}

function retreat() {
  if (confirm("DO YOU REALLY WANT TO RETREAT?")) {
    attackbtn.remove();
    retreatbutton.remove();
  }
}

// attackbtn.addEventListener("click", startshoot());

function load() {
  document.getElementById("usshull").textContent = "20";
  document.getElementById("ussfp").textContent = "5";
  document.getElementById("ussacc").textContent = "0.7";
}

function Reload() {
  window.location.reload();
}

function startshoot() {
  roundcnt++;
  alert("ATTACK WITH ALIEN " + roundcnt);
  if (roundcnt === 1) hullcnt = 20;
  if (roundcnt <= 6) {
    const ussShip = new Ship(hullcnt, 5, 0.7);
    console.log(ussShip);

    //on click of Attackbutton add the listener
    const alienship = new Ship(
      getRandomHull(),
      getRandomFirePower(),
      getRandomAccuracy()
    );
    document.getElementById("alienhull").textContent = alienship.hull;
    document.getElementById("alienfp").textContent = alienship.firepower;
    document.getElementById("alienacc").textContent = alienship.accuracy;

    ussShip.attack(alienship);

    if (hullcnt <= 0) {
      alert("GAME OVER");
      attackbtn.remove();
      retreatbutton.remove();
    } else {
      alert(`You won with ${hullcnt} lives`);
    }
  } else {
    alert("GAME OVER");
    attackbtn.remove();
    retreatbutton.remove();
  }
}
