
class CatFacts {

  createUIElements(data) {

    const factsArray = [];
    
    data.data.forEach(fact => {
      const oneItem = document.querySelector("ul").appendChild(document.createElement("li"));
      oneItem.innerText = fact;
      factsArray.push(fact);
    });

    this.pushToLocalStorage(factsArray);
  }

  resetFacts() {
    const ulElement = document.querySelector("ul");
    while(ulElement.firstChild) {
      ulElement.removeChild(ulElement.firstChild);
    }
    localStorage.removeItem("facts");
  }

  getFacts(num) {

      const url =`https://meowfacts.herokuapp.com/?count=${num}`
      fetch(url)
          .then(res => res.json()) // parse response as JSON
          .then(data => {
            console.log(data.data);
            this.createUIElements(data);
          })
          .catch(err => {
              console.log(`error ${err}`)
          });
    }

    fetchRandomGif() {
      const url = "https://api.thecatapi.com/v1/images/search"
      fetch(url)
      .then(response => response.json())
      .then( data => {
        console.log(data)
        document.querySelector("img").src = data[0].url;
      })
      .catch(err => {
        console.log("Error: ", err)
      })
    }


    pushToLocalStorage(facts) {
      if(!localStorage.facts) {
      localStorage.setItem("facts", JSON.stringify(facts));
      console.log(localStorage.facts);
    } else {
      localStorage.setItem("facts", JSON.stringify(JSON.parse(localStorage.facts).concat(facts)));
    }
    }

    readLocalStorage() {
      if(localStorage.facts) {
        const factsArray = JSON.parse(localStorage.getItem("facts"));
        console.log(factsArray);

        factsArray.forEach(fact => {
          const oneItem = document.querySelector("ul").appendChild(document.createElement("li"));
          oneItem.innerText = fact;
      })
    }
  }
}

const catFacts = new CatFacts();

catFacts.readLocalStorage();

catFacts.fetchRandomGif();

document.querySelector('#fact1').addEventListener('click', () => {
  catFacts.getFacts(1);
});

document.querySelector('#fact2').addEventListener('click', () => {
  catFacts.getFacts(2);
});

document.querySelector('#fact3').addEventListener('click', () => {
  catFacts.getFacts(3);
});

document.querySelector('#reset').addEventListener('click', () => {
  catFacts.resetFacts();
});





