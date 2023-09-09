let arr = ["Akshay", "Aditya"];

let object = {
    name: "Akshay",
    city: "Dehradun",
    getIntro: function() {
        console.log(this.name + "from" + this.city);
    }
}