let count = 0;

function greet_me() {

    if(document.getElementById('name').value){
        let message = [];
    message.push(document.getElementById('name').value);
    const d = new Date();
    let hours = d.getHours();

    if (hours >= 5 && hours < 12) {
        message.push('Good morning');
    } else if (hours == 12) {
        message.push('Good noon');
    } else if (hours >= 13 && hours <= 17) {
        message.push('Good evening');
    } else {
        message.push('Good night');
    }

  
    setInterval(animation, 1500);

    function animation() {
        if (count == 0) {
            document.getElementById('display').innerHTML = `Hallo ${message[0]}`;
            count++;
        } else if (count == 1) {
            document.getElementById('display').innerHTML = `${message[1]}`;
            count++;
        } else if (count == 2) {
            document.getElementById('display').innerHTML = `${message[1]} ${message[0]}`;
            count = 0; // Reset count to cycle through the messages again
        }
    }
    }
    else{
        alert('Enter your name..')
    }
}
