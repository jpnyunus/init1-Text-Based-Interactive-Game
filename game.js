const allgame = document.querySelector('.allgame');
const newInp = document.createElement('input');
const startgameBtn = document.getElementById('startgame')
const nicknameInp = document.getElementById('nickname')
const music = document.getElementById("myAudio"); 
const muteMusic = document.getElementById("mute")

// Sayfa temizligi :D
function clear() {
    allgame.innerHTML = ''
}

let h1Counter = 0
let nickname = ''

nicknameInp.addEventListener('input', function(event) {
    nickname = event.target.value;
});

// Muzik acik kapali ayari
let musicEnabled = true;
muteMusic.addEventListener('click', function() {
    musicEnabled = !musicEnabled; 
});

// Yeni h1 olusturuyoruz
function createNewH1(text) {
    return new Promise(resolve => {
        const newH1 = document.createElement('h1');
        const uniqueId = 'element' + h1Counter++;
        newH1.id = uniqueId;
        allgame.appendChild(newH1);

        if (musicEnabled) {
            music.play();
        }

        const typed = new Typed(`#${uniqueId}`, {
            strings: [`${text}`],
            typeSpeed: 10,
            onComplete: () => {
                if (musicEnabled) {
                    music.pause();
                }
                resolve();
            }
        });

        // space tusuna basilirsa yazi animasyonunu kes
        document.addEventListener('keydown', function(event) {
            if (event.keyCode === 32) {
                typed.destroy();
                newH1.textContent = text;
                if (musicEnabled) {
                    music.pause();
                }
                resolve();
            }
        });
    });
}

// h1 olusturuyoruz
function createNewH1(text) {
    return new Promise(resolve => {
        const newH1 = document.createElement('h1');
        const uniqueId = 'element' + h1Counter++;
        newH1.id = uniqueId;
        allgame.appendChild(newH1);

        if (musicEnabled) {
            music.play();
        }

        const typed = new Typed(`#${uniqueId}`, {
            strings: [`${text}`],
            typeSpeed: 10,
            onComplete: () => {
                if (musicEnabled) {
                    music.pause();
                }
                resolve();
            }
        });

        // space tusuna basilirsa yazi animasyonunu kes
        document.addEventListener('keydown', function(event) {
            if (event.keyCode === 32) {
                typed.destroy();
                newH1.textContent = text;
                if (musicEnabled) {
                    music.pause();
                }
                resolve();
            }
        });
    });
}

// sureli h1 olusturuyoruz (kullanmadim sanirim hic)
function createInsantNewH1(text, delay) {
    return new Promise(resolve => {
        setTimeout(() => {
            const newH1 = document.createElement('h1');
            const uniqueId = 'element' + h1Counter++;
            newH1.id = uniqueId;
            newH1.textContent = text;
            allgame.appendChild(newH1);
            resolve();
        }, delay);
    });
}


// Yeni resim
function newImg(url) {
    return new Promise(resolve => {
        const img = document.createElement('img');
        img.src = url;
        img.classList.add('animate__animated', 'animate__fadeIn');
        img.onload = resolve;
        allgame.appendChild(img);
    });
}

// Yeni soru uret
function question(id, ques) {
    const question = document.createElement('div');
    question.classList.add('question_div');
    question.innerHTML = `
        <label class="animate__animated animate__fadeIn">
            <input id="${id}" type="radio" name="answer" />
            <span>${ques}</span>
        </label>
    `;
    return question;
}

// Space ile bolum atlamak icin
function waitForSpace() {
    return new Promise(resolve => {
        const spaceListener = function(event) {
            if (event.keyCode === 32 || event.type === 'touchstart') {
                document.removeEventListener('keydown', spaceListener);
                document.removeEventListener('touchstart', spaceListener);
                resolve();
            }
        };
        document.addEventListener('keydown', spaceListener);
        document.addEventListener('touchstart', spaceListener);
    });
}


// oyun zevkini bozmamasi icin sag tiki devre disi yapiyoruz, (kodlar gozukmesin diye yaptim) saka saka ACIK KAYNAK PAYLASIYORUM (zaten kodlari saklamyamam... aslinda bu kodlari gormenizi istemezdim lutfen cok yargilamayin :3)
window.addEventListener('contextmenu', function (e) { e.preventDefault(); }, false);


startgameBtn.addEventListener('click', function() {
    if (nickname.trim() == '') {
        alert('Lutfen bir isim giriniz')
    } else {
        startGame()
    }
})

async function startGame() {
    clear()
    await newImg('/img/woodhouse.png');
    await createNewH1(`It has been a long time since you tried to get away from the hacking adventure and find peace in nature. Now here, with the whispering of the trees and the sound of the nearby stream, I found an unexpected sense of peace.`);
    await createNewH1(`A sudden buzz from his old, dust-covered phone broke the silence. A message from Avunit, a ghost from his past, a companion in the digital underground. His words ignited a spark of curiosity in her.`);
    await createNewH1(`"They're hiding something big. Something about the universe. We need you."`);
    await questionOne();
}

async function questionOne() {
    allgame.appendChild(question('yes', 'Deal with the message'));

    const yesRadio = document.getElementById('yes');

    await new Promise(resolve => {
        yesRadio.addEventListener('change', function() {
            if (this.checked) {
                seeOffer().then(resolve);
            }
        });
    });
}

async function seeOffer() {
    clear();
    await newImg('/img/sms.png');
    await createNewH1(`Hey, it's me, Avunit. ${nickname}, it's been a long time, hasn't it? Listen, I know you've put it all behind you, but there's a storm coming. There's something lurking in the shadows, something the government doesn't want us to see. The little we know suggests it has something to do with the universe, something too big to measure. But we're reaching a dead end. We need your expertise, your intuition to solve this mystery. Will you join us?`);
    await questionTwo()
}

async function qOneEnd() {
    clear();
    await newImg('/img/retire.png')
    await createNewH1('THE END');
    await createNewH1(`Retirement suits you. The tranquility of the forest is your reward. Although there are questions about Avunit's message, you find peace in the path you have chosen.`)
}

async function questionTwo() {
    allgame.appendChild(question('yes', 'Let me cook'));
    allgame.appendChild(question('no', 'Nah, im good with retirement'));

    const yesRadio = document.getElementById('yes');
    const noRadio = document.getElementById('no');

    await new Promise(resolve => {
        yesRadio.addEventListener('change', function() {
            if (this.checked) {
                youIn().then(resolve);
            }
        });
        
        noRadio.addEventListener('change', function() {
            if (this.checked) {
                qOneEnd().then(resolve);
            }
        });
    });
}

async function youIn() {
    clear();
    await newImg('img/car.png');
    await createNewH1(`The towering cityscape in the distance is a stark contrast to the serene forest you're leaving behind.`) 
    await createNewH1(`"The universe? What could they be hiding about the universe? Or are aliens real :D?"`)
    await createNewH1(`One thing's for sure, if Avunit reached out to me after all these years, this is serious. Time to find out what's going on.`)
    await waitForSpace()
    await backToCity()
}

async function backToCity() {
    clear();
    await newImg('img/citypeople.png');
    await createNewH1(`The city's symphony envelops you: car horns, distant sirens, the chatter of countless voices. Towers of steel and glass pierce the sky, casting long shadows over the bustling streets below.`)
    await createNewH1(`But the city's chaos can't distract you from what's bothering you. Avunit's message, a seed of mystery, has taken root, and you're eager to see it bloom.`)
    await waitForSpace()
    await arriveHome()
}

async function arriveHome() {
    clear();
    await newImg('img/monitors.png');
    await createNewH1('Entering your home, you spot your old PC and monitors gathering dust. a wave of nostalgia washes over you as you remember countless nights spent here, fingers flying across the keyboard, eyes glued to the glowing lines of code.')
    await waitForSpace()
    await pcLogin()
}

let password = ''

async function pcLogin() {
    clear()
    const loginScreen = document.createElement('div');
    loginScreen.innerHTML = `<div style="width: 100%; height: 60vh; border: 1px solid white; display: flex; align-items: center; justify-content: center;">
                            <div>
                                <p style="margin: 0;">linux-userKTM12QM</p>
                                
                                <input style="margin-top: 10px;" class="signininput" id="signininput" type="text" placeholder="Password">
                                <p id="errorMsg" style="color: red; margin: 0; font-size: 1rem;"></p>
                                <button class="signin" id="signinbtn">Sign in</button>
                                <p id="hint" style="cursor: pointer;">password hint</p>
                                <p id="passwordhint" style="margin: 0; font-size: 1.1rem; padding: 5px; width: 25rem;"></p>     
                            </div>
                        </div>`
    loginScreen.classList.add('animate__animated', 'animate__fadeIn')
    allgame.appendChild(loginScreen)
    await createNewH1('damnn.. what was my password?')
    const passValue = document.getElementById('signininput')
    const passwordHint = document.getElementById('hint')
    const hintText = document.getElementById('passwordhint')
    const errorMsg = document.getElementById('errorMsg')

    passwordHint.addEventListener('click', () => {hintText.innerHTML = `right now you see the password on your screen... </br> why don't you take a look at the top of the address bar? </br> i***1`});
    passValue.addEventListener('input', function(event) {
        password = event.target.value;
    });

    document.addEventListener('keydown', function(event) {
        if (event.keyCode === 32) {
            event.preventDefault();
        }
    });
    
    const signBtn = document.getElementById('signinbtn')
    signBtn.addEventListener('click', function() {
        if (password == 'init1') {
            clear()
            desktop()
        } else {
            errorMsg.innerText = 'wrong password'
        }
    })
}

async function desktop() {
    const desktop = document.createElement('div')
    desktop.innerHTML = `
                        <div style="width: 100%; height: 60vh; border: 1px solid white; display: flex; align-items: start; flex-direction: column; justify-content: space-between; background-image: url(https://res.cloudinary.com/canonical/image/fetch/f_auto,q_auto,fl_sanitize,c_fill,w_960,h_601/http://design.canonical.com/wp-content/uploads/wallpaper_blog_post.jpg); background-repeat: no-repeat; background-position: center center;">
                                <div class="wrap">
                                    <div id="mail" class="mail" style="margin: 10px; align-items: center; text-align: center; cursor: pointer;">
                                        <div style="position: absolute; background-color: red; width: 15px; height: 15px; border-radius: 50%; margin-left: 26px; top: 16px;">1</div>
                                        <img style="width: 34px; height: 34px;" src="/img/mail.jpg" alt=""> <br>
                                        <span style="font-size: 0.8rem;">mail</span>
                                </div>
                                <div id="mail" class="mail" style="margin: 10px; align-items: center; text-align: center; cursor: pointer;">
                                    <img style="width: 34px; height: 34px;" src="/img/folder.png" alt=""> <br>
                                    <span style="font-size: 0.8rem;">archive</span>
                                </div>

                                <div id="mail" class="mail" style="margin: 10px; align-items: center; text-align: center; cursor: pointer;">
                                    <img style="width: 34px; height: 34px;" src="/img/folder.png" alt=""> <br>
                                    <span style="font-size: 0.8rem;">init</span>
                                </div>
                                </div>

                                <div style="background-color: gray; width: 100%; height: 2rem; display: flex; align-items: center;">
                                <span style="margin: 0; font-size: 1rem; margin-left: 5px; cursor: pointer;">Menu</span>
                                </div>
                        </div>`
    desktop.classList.add('animate__animated', 'animate__fadeIn')
    allgame.appendChild(desktop)
    const mailIcon = document.getElementById('mail')
    mailIcon.addEventListener('click', function() {
        clear()
        mail()
    })
}

async function mail() {
    const mail = document.createElement('div')
    mail.innerHTML = `<div style="width: 100%; height: 60vh; border: 1px solid white; display: flex; color: black; align-items: center; justify-content: space-between; flex-direction: column; background-image: url(https://res.cloudinary.com/canonical/image/fetch/f_auto,q_auto,fl_sanitize,c_fill,w_960,h_601/http://design.canonical.com/wp-content/uploads/wallpaper_blog_post.jpg); background-repeat: no-repeat; background-position: center center;">
                        <div class="mail" style="background-color: rgb(202, 202, 202); width: 50vh; border: 1px solid rgb(17, 17, 17); display: flex; flex-direction: column; align-items: start; padding: 10px; margin-top: 3rem;">
                            <div class="mailbox" style="display: grid; grid-auto-flow: column;">
                                <img style="width: 50px; height: 50px;" src="/img/profilepic.png" alt="">
                                <div style="display: inline; margin-top: 10px;">
                                    <p style="font-size: 0.9rem; margin: 0; margin-left: 5px;">From: avunit@anonmail.sh</p>
                                    <p style="font-size: 0.9rem; margin: 0; margin-left: 5px;">To: ${nickname}@anonmail.sh</p>
                                </div>
                            </div>
                            <div class="message" style="overflow-y: auto; max-height: 40vh; margin-top: 20px;">
                                <p style="font-size: 1.8rem; margin: 5px;">welcome back my friend</p>
                                <p style="margin: 5px; font-size: 1.1rem;"><a style="font-size: 1.1rem; color: black;" target="_blank" href="https://knowyourmeme.com/memes/glowie-glowposting">glowies</a> still haven't found our mail service to this day xd the day you created this mail service you told me it was nothing much lol</p>
                                <p style="margin: 5px; font-size: 1.1rem; margin-top: 10px;">anyway.. you must have heard of the James Webb Space Telescope by now. It's been sending us countless images from space. Well, my friend on the inside got some intel. Turns out, only 1% of the images they share with us. That means there are hundreds of thousands of pictures they're keeping to themselves. There must be something they're hiding. We should hack into their systems, but their security is top-notch. I can't think of a way to hack them without physical access to their servers.</p>
                                <p style="margin: 5px; font-size: 1.1rem; margin-top: 10px;">I'm sending you a file with some things we've researched and found, take a look.</p>

                                <div id="info" class="info" style="display: flex; flex-direction: column; margin: 10px; align-items: start; justify-content: start; text-align: start; cursor: pointer;">
                                    <img style="width: 34px; height: 34px;" src="/img/txt.png" alt=""> <br>
                                    <span style="font-size: 0.9rem;">info.txt</span>
                                </div>
                            </div>
                        </div>

                        <div style="background-color: gray; width: 100%; height: 2rem; display: flex; align-items: center;">
                            <span style="margin: 0; font-size: 1rem; margin-left: 5px; cursor: pointer;">Menu</span>
                            </div>
                    </div>`
    allgame.appendChild(mail)
    await createNewH1(`Hmm... Avunit's message, huh?`)
    await createNewH1(`Only 1% has been shared? What could they be hiding from us? It feels like we're missing a big piece of the puzzle. Jumping straight to hacking seems risky. We need to think smarter. It might be good to gather more information first.`)
    const inf = document.getElementById('info')
    inf.addEventListener('click', infoFile)
}

async function infoFile() {
    clear()
    const info = document.createElement('div')
    info.innerHTML = `<div style="width: 100%; height: 60vh; border: 1px solid white; display: flex; color: black; align-items: center; justify-content: space-between; flex-direction: column; background-image: url(https://res.cloudinary.com/canonical/image/fetch/f_auto,q_auto,fl_sanitize,c_fill,w_960,h_601/http://design.canonical.com/wp-content/uploads/wallpaper_blog_post.jpg); background-repeat: no-repeat; background-position: center center;">
                        <div class="txt" id="txt" style="background-color: rgb(202, 202, 202); width: 50vh; height: 32vh; overflow-y: auto; border: 1px solid rgb(17, 17, 17); display: flex; flex-direction: column; padding: 10px; margin-top: 6rem;">
                            <p style="margin: 0; font-size: 1.2rem;">they're using the Goldstone Radio Telescope to communicate with James Webb</p>
                            <p style="margin: 0; margin-top: 0.7rem; font-size: 1.2rem;">security is extremely high, only authorized access is allowed within a 10km radius, police are constantly patrolling</p>
                            <p style="margin: 0; margin-top: 0.7rem; font-size: 1.2rem;">it is impossible to hack the system remotely (even if it's ${nickname})</p>
                            <p style="margin: 0; margin-top: 0.7rem; font-size: 1.2rem;">our man inside can get us in but even after that it's too risky, we might get caught by the security inside. Once we're in, we need to hack the main computer and redirect the data to our systems.</p>
                            <p style="margin: 0; margin-top: 0.7rem; font-size: 1.2rem;">35° 25′ 36″ N, 116° 53′ 24″ W</p>
                            
                            
                        </div>

                        <div style="background-color: gray; width: 100%; height: 2rem; display: flex; align-items: center;">
                            <span style="margin: 0; font-size: 1rem; margin-left: 5px; cursor: pointer;">Menu</span>
                            </div>
                    </div>
                    </div>`
        allgame.appendChild(info)  
        await createNewH1(`"Impossible to hack remotely, even for me?"  xd`)
        await waitForSpace()
        await aloneOrFiziksel()
}

async function aloneOrFiziksel() {
    clear()
    await newImg('/img/monitors2.png')
    await createNewH1("the glow of the monitors illuminates your face, reflecting the turmoil within.");
    await createNewH1("meeting Avunit... it goes against everything you've built your life on. anonymity is your shield, your defense against the world.");
    await createNewH1("but this situation... it's different. the stakes are higher. maybe, just maybe, working together could be the key to this hack");
    await createNewH1(`fuck.. i don't know what to do.`)
    await questionRule()
}

async function questionRule() {
    allgame.appendChild(question('yes', `don't break the rule`));
    allgame.appendChild(question('no', `it's time to break the rule for once`));

    const yesRadio = document.getElementById('yes');
    const noRadio = document.getElementById('no');

    await new Promise(resolve => {
        yesRadio.addEventListener('change', function() {
            if (this.checked) {
                wakeUp().then(resolve);
            }
        });
        
        noRadio.addEventListener('change', function() {
            if (this.checked) {
                clear();
                bulusma().then(resolve);
            }
        });
    });
}

async function wakeUp() {
    clear()
    await newImg('/img/wakeup.png')
    await createNewH1(`it's been a few days, i'm not getting enough sleep, but i'm very close to hacking`)
    await createNewH1(`it pissed Avunit off that i didn't break my rule and tried to handle it remotely, but i couldn't break my rule sorry...`)
    await waitForSpace()
    await hackScreen()
}

async function hackScreen() {
    clear()
    const hack = document.createElement('div')
    hack.innerHTML = `<div style="width: 100%; height: 60vh; border: 1px solid white; display: flex; color: black; align-items: center; justify-content: space-between; flex-direction: column; background-image: url(https://res.cloudinary.com/canonical/image/fetch/f_auto,q_auto,fl_sanitize,c_fill,w_960,h_601/http://design.canonical.com/wp-content/uploads/wallpaper_blog_post.jpg); background-repeat: no-repeat; background-position: center center;">
                    <div class="txt" id="txt" style="background-color: rgb(65, 31, 31); width: 50vh; height: 32vh; overflow-y: auto; border: 1px solid rgb(17, 17, 17); display: flex; flex-direction: column; padding: 10px; margin-top: 6rem;">
                        <div style="display: flex;">
                            <p style="margin: 0; font-size: 1.2rem; color: white;">userKTM12QM@desktop:~$</p> <input id="hackinput" style="margin: 0; height: 10px; margin-top: 4px;" type="text">
                        </div>            
                    </div>
                    <div style="background-color: gray; width: 100%; height: 2rem; display: flex; align-items: center;">
                        <span style="margin: 0; font-size: 1rem; margin-left: 5px; cursor: pointer;">Menu</span>
                        </div>
                </div>
                </div>`
    allgame.appendChild(hack)
    await createNewH1(`i finally did it, although it took much longer than usual, now all that is needed is to write our server ip address (218.108.149.373) and press the Enter then all the data that comes to them will come to us. who said this was impossible even for ${nickname}? Okay, okay, i might not have been able to do this if Avunit hadn't shared the information even though he was mad at me.`)

    const hackInput = document.getElementById('hackinput');
    
    hackInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
          const enteredIP = hackInput.value;
          if (enteredIP === '218.108.149.373') {
            avunitFbi()
          } else {
            createNewH1(`i mistyped the ip address like an idiot, my hands are shaking`);
          }
        }
      });
}

async function avunitFbi() {
    clear()
    const avunitTip = document.createElement('div')
    avunitTip.innerHTML = `<div style="width: 100%; height: 60vh; border: 1px solid white; display: flex; color: black; align-items: center; justify-content: space-between; flex-direction: column; background-image: url(https://repository-images.githubusercontent.com/356367080/35485400-99f2-11eb-90ad-0dbd618410db); background-repeat: no-repeat; background-position: center center;">
                            <div class="txt" id="txt" style="background-color: rgb(212, 212, 212); width: 65vh; height: 40vh; overflow-y: auto; border: 1px solid rgb(17, 17, 17); display: flex; flex-direction: column; margin-top: 4rem;">
                                <div style="display: flex; background-color: beige; padding: 5px; justify-content: space-between; align-items: center;">
                                    <div style="display: flex;">
                                        <img style="width: 60px; height: 60px;" src="https://tips.fbi.gov/assets/img/logo/fbi_seal_new.png" alt="">
                                        <h1 style="margin: 5px;">THE FBI</h1>
                                        <p style="margin: 0; width: 110px; font-size: 1rem; margin-top: 1rem;">Federal Bureau of Investigation</p>
                                    </div>
                                    <div>
                                        <a style="color: black;" href="">Contact US</a>
                                        <a style="color: black;" href="">About US</a>
                                        <a style="color: black;" href="">Most WANTED</a>
                                    </div>
                                </div>
                                    <div style="display: flex; flex-direction: column; justify-content: center; text-align: center; align-items: center; margin-top: 2.5rem;">
                                        <h1 style="margin: 0; margin-top: 3rem; margin-left: 0.5rem; color: rgb(65, 80, 50);">Thank you for your anonymous tip</h1>
                                        <p style="margin: 0; margin-left: 0.5rem; margin-top: 5px; font-size: 1rem; width: 30rem;">We have successfully received your anonymous report thank you for your support, you can close this page now.</p>
                                    </div>
                            </div>
                            <div style="background-color: gray; width: 100%; height: 2rem; display: flex; align-items: center;">
                                <span style="margin: 0; font-size: 1rem; margin-left: 5px; cursor: pointer;">Menu</span>
                                </div>
                        </div>
                        </div>`
    allgame.appendChild(avunitTip)
    await createNewH1(`i'm so damn sorry, ${nickname}, but i had to do this`)
    await createNewH1(`i know you're the best damn hacker out there, but this whole thing... it's way outta our league. if you kept digging, you could've gotten us all caught. that IP I gave you.. it's a trap. the glowies will be knocking on your door soon. i just... i couldn't risk it, you know? i had to protect our group`)
    await waitForSpace()
    iDid()  
}

async function iDid() {
    clear()
    await newImg('/img/ididit.png')
    await createNewH1('finally... it was challenging but it can be done remotely lol, i will now be waiting for an mail from Avunit expressing him shock hahahah')
    await createInsantNewH1('is that the doorbell? i live here like a ghost. who could it be?')
    await waitForSpace()
    fbiDoor()
}

async function fbiDoor() {
    clear()
    await newImg('/img/fbiend.png')
    await createNewH1(`"KNOCK KNOCK MOTHER FUCKER"`)
    await createNewH1(`Avunit... he sold you out. He thought you were getting in too deep, that you'd expose both of you and group`)
    await createNewH1("but the FBI, they've been watching you for years. they know your talents");
    await createNewH1("now they're offering you a way out. Work for them, use your skills to catch other hackers, and they'll forget about your past");
    await fbiQuest()
}

async function fbiQuest() {
    allgame.appendChild(question('yes', `accept the deal`));
    allgame.appendChild(question('no', `refuse and face the consequences`));

    const yesRadio = document.getElementById('yes');
    const noRadio = document.getElementById('no');

    await new Promise(resolve => {
        yesRadio.addEventListener('change', function() {
            if (this.checked) {
                lol().then(resolve);
            }
        });
        
        noRadio.addEventListener('change', function() {
            if (this.checked) {
                giveUp().then(resolve);
            }
        });
    });
}

async function lol() {
    clear()
    await newImg('/img/laugh.png')
    await createNewH1('nahh FBI is just making fun of you')
    await createNewH1('THE END')
    await waitForSpace()
    clear()
    const catvid = document.createElement('div')
    catvid.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/L8XbI9aJOXk?si=Fkw7WjXtyHoDIiL4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
    allgame.appendChild(catvid)
}

async function giveUp() {
    clear()
    await createNewH1(`the judge's voice is cold and final as they pronounce your sentence: life in prison`)
    await createNewH1("the weight of your past crimes crashes down on you. years of freedom, gone")
    await createNewH1(`...`)
    await createNewH1("years turn into decades. you become a legend within the prison walls, the infamous hacker who almost cracked the system")
    await createNewH1("one day, a young, ambitious inmate approaches you, seeking your guidance...")
    await createNewH1("(to be continued...?)") // elbet bir gun... :D
}

async function bulusma() {
    clear()
    await newImg('/img/handshake.png')
    await createNewH1(`for the first time you broke your own rule and met Avunit, now it's time to plan...`)
    await createNewH1(`"max is our inside man," Avunit explains, "He'll smuggle you in through the service entrance during shift change.  Once inside, you'll have a limited time to access the main computer"`)
    await waitForSpace()
    await getIn()
}

async function getIn() {
    clear()
    await newImg('img/incar.png')
    await createNewH1(`curled up in the cramped darkness of the car's backseat, you feel a knot of tension tighten in your stomach`)
    await createNewH1(`max's calm demeanor is reassuring, but the risk is palpable. One wrong move, one suspicious guard, and the whole operation could crumbl`)
    await waitForSpace()
    await check()
}

async function check() {
    clear()
    await newImg('img/check.png')
    await createNewH1(`the guard approaches the car, his flashlight beam scanning the interior. You shrink back into the shadows, your heart pounding in your chest`);
    await createNewH1(`suddenly, the guard's stern expression softens into a smile. "Max?  Didn't expect to see you on the night shift! everything alright?"`);
    await createNewH1(`max chuckles, "Just covering for a friend. Long night ahead."  The guard nods in understanding. "Stay safe out there, Max. Good night."`);
    await createNewH1(`as the guard walks away, you release a breath you didn't realize you were holding. That was close. Too close.`);
    await waitForSpace()
    await wrap()
}

async function wrap() {
    clear();

    await createNewH1(`The cool air of the observatory washes over you as you step through the heavy steel door. Max leads you down a dimly lit corridor, the hum of machinery a constant undercurrent.`);
    await createNewH1(`"This is where I leave you," Max says, his voice low. "The main computer room is one of these four. I've disabled the security cameras for ten minutes, but after that, you're on your own."`);

    allgame.appendChild(question('1', `Room 1`));
    allgame.appendChild(question('2', `Room 2`));


    const yes1 = document.getElementById('1');
    const yes2 = document.getElementById('2');

    await new Promise(resolve => {
        yes1.addEventListener('change', function() {
            if (this.checked) {
                enterRoom1().then(resolve);
            }
        });
        
        yes2.addEventListener('change', function() {
            if (this.checked) {
                enterRoom2().then(resolve);
            }
        });
    });
}

async function enterRoom1() {
    clear();
    await newImg('/img/emptyroom.png')
    await createNewH1(`this isn't the right room! GO BACK STUPID! time is running out...`)
    await waitForSpace()
    await wrap()
}

async function enterRoom2() {
    clear();
    await newImg('/img/serverroom.png')
    await createNewH1(`the servers hum and blink, data flowing through their circuits. this is it!`)
    await createNewH1(`okay, now you have to hack this beauty fast`)
    await waitForSpace()
    await hackServer()
}

async function hackServer() {
    clear();
    const termux = document.createElement('div');
    termux.innerHTML = `
        <div style="width: 100%; height: 60vh; border: 1px solid white; display: flex; color: black; align-items: center; justify-content: space-between; flex-direction: column; background-image: url(https://149366088.v2.pressablecdn.com/wp-content/uploads/2022/03/jammy-jellyfish-wallpaper.jpg); background-repeat: no-repeat; background-position: center center;">
            <div class="trmx" id="trmx" style="background-color: rgb(65, 31, 31); width: 50vh; height: 32vh; overflow-y: auto; border: 1px solid rgb(17, 17, 17); display: flex; flex-direction: column; padding: 10px; margin-top: 6rem;">
                <div style="display: flex;">
                    <p style="margin: 0; font-size: 1.2rem; color: white;">server@desktop:~$</p> <input id="hackserver" style="margin: 0; height: 10px; margin-top: 4px;" type="text">
                </div>            
            </div>
            <div style="background-color: gray; width: 100%; height: 2rem; display: flex; align-items: center;">
                <span style="margin: 0; font-size: 1rem; margin-left: 5px; cursor: pointer;">Menu</span>
            </div>
        </div>
    `;
    allgame.appendChild(termux);

    // geri sayım için paragraf elementi
    const countdownElement = document.createElement('p');
    countdownElement.textContent = `Time left: 15 seconds`;
    countdownElement.style.color = 'white';
    countdownElement.style.fontSize = '1.1rem';
    countdownElement.style.margin = '0';
    termux.querySelector('.trmx').appendChild(countdownElement);

    await createNewH1(`TYPE THE IP ADDRESS QUICKLY BEFORE SECURITY CATCHES YOU!!! 192.251.68.249`)
    let timeLeft = 15;
    const countdown = setInterval(() => {
        timeLeft--;
        if (timeLeft > 0) {
            countdownElement.textContent = `Time left: ${timeLeft} seconds`;
        } else {
            clearInterval(countdown);
            gameOverTime();
        }
    }, 1000);

    const hackserver = document.getElementById('hackserver');
    hackserver.addEventListener('input', function() {
        if (hackserver.value === '192.251.68.249') {
            clearInterval(countdown);
            exitBuilding();
        }
    });
}

async function gameOverTime() {
    clear()
    await createNewH1('Time is up! security caughty you! LOL')
}

async function exitBuilding() {
    clear()
    await newImg('img/incar.png');
    await createNewH1('access granted, baby! You have successfully hacked the server!')
    await createNewH1('now, you go back with Max and hide behind the car again.')
    await waitForSpace()
    await callAvunit()
}

async function callAvunit() {
    clear()
    await newImg('img/phonecall.png');
    await createNewH1(`You dial Avunit's number and anxiously wait for him to pick up.`);
    await createNewH1(`"Avunit, it's done! we've hacked the server. check the system now!" you say urgently.`);
    await waitForSpace()
    await avunitpc();
}

async function avunitpc() {
    clear()
    await newImg('img/avunitpc.png');
    await createNewH1(`Avunit checks the system and is visibly surprised by the success. As he analyzes the data, his expression shifts from disbelief to shock.`)
    await createNewH1(`"this can't be real..." he mutters to himself, staring at the screen in disbelief.`)
    await createNewH1(`avunit's voice trembles as he speaks, "this is beyond anything i've ever imagined. you need to come here immediately!"`);
    await waitForSpace()
    await maxandyou();
}

async function maxandyou() {
    clear()
    await newImg('img/incar.png')
    await createNewH1(`You and Max sit in stunned silence, trying to comprehend what Avunit could have possibly seen.`)
    await createNewH1(`The car ride to Avunit's house is tense, filled with anticipation and uncertainty.`)
    await createNewH1(`You exchange nervous glances, both lost in your own thoughts. Why was Avunit so shaken?`)
    await createNewH1(`As you arrive at Avunit's house, your heart pounds with anticipation. The answers you seek lie just beyond the door.`)
    await waitForSpace()
    await frontDoor()
  }

async function frontDoor() {
    clear()
    await newImg('img/frontdoor.png')
    await createNewH1(`You reach Avunit's front door and knock gently.`)
    await createNewH1(`After a moment, the door slowly opens to reveal Avunit standing in the entryway, a grave expression on their face.`)
    await createNewH1(`"There's much to discuss. Come in" Avunit says softly, stepping aside to let you enter.`)
    await waitForSpace()
    await avunitRoom()
}
  
async function avunitRoom() {
    clear()
    await newImg('img/avunitroom.png')
    await createNewH1(`Avunit leads you to their room.`)
    await createNewH1(`After a moment of silence as Avunit sits at their desk, he turn to you.`)
    await createNewH1(`"Prepare yourself," he say quietly, "what you are about to see will change everything."`)
    await waitForSpace()
    await aliens1()
}

async function aliens1() {
    clear()
    await newImg('img/alien1.png')
    await waitForSpace()
    await newImg('img/alien2.png')
    await waitForSpace()
    await aliens2()
}

async function aliens2() {
    clear()
    await newImg('img/alien3.png')
    await waitForSpace()
    await newImg('img/alien4.png')
    await waitForSpace()
    await aliens3()
}

async function aliens3() {
    clear()
    await newImg('img/alien5.png')
    await waitForSpace()
    await newImg('img/alien6.png')
    await waitForSpace()
    await seriousTalk()
}

async function seriousTalk() {
    clear()
    await newImg('img/think.png');
    await createNewH1(`"What? What have we done? Alien civilizations? Why would they keep this hidden? This is unbelievable!"`)
    await createNewH1(`A heavy silence fills the room as you grapple with the enormity of what you've discovered.`)
    await createNewH1(`"We need to think carefully about our next steps," Avunit says, their voice barely above a whisper. "Revealing this to the world could have consequences we can't even imagine."`)
    await createNewH1(`As you look at the images on the screen, a sense of awe and trepidation washes over you. The secrets of the universe are laid bare before you, but at what cost?`)
  
    // Create choices for the player
    allgame.appendChild(question('1', 'Share with the world'));
    allgame.appendChild(question('2', 'Do not share'));
  
    const yes = document.getElementById('1');
    const no = document.getElementById('2');
  
    await new Promise(resolve => {
      yes.addEventListener('change', function() {
        if (this.checked) {
          share().then(resolve);
        }
      });
  
      no.addEventListener('change', function() {
        if (this.checked) {
          dontShare().then(resolve);
        }
      });
    });
  }

async function share() {
    clear()
    await newImg('img/news.png')
    await createNewH1(`the revelation sparked widespread panic and chaos, as people struggled to come to terms with the existence of extraterrestrial civilizations. governments around the world scrambled to contain the situation, but misinformation and fear-mongering spread like wildfire.`)
    await createNewH1(`as you look back on that fateful decision, you can't help but wonder if revealing the truth was the right choice after all. the world may never be the same again, and the consequences of your actions continue to reverberate through history`)
    await createNewH1(`THE END`)
}

async function dontShare() {
    clear()
    await newImg('img/think.png')
    await createNewH1(`After much deliberation, you and Avunit decide to keep the existence of extraterrestrial civilization a secret, choosing to withhold the footage from the world.`)
    await createNewH1(`You both agree that revealing such groundbreaking information would only lead to chaos and instability, and humanity may not be ready to confront the reality of life beyond Earth. In the years that follow, you and Avunit continue your research in secret, delving deeper into the mysteries of the universe.`)
    await createNewH1(`As you gaze up at the stars, you can't help but feel a heavy sense of responsibility on your shoulders. You are one of the few who know this secret, and you are sworn to keep it safe until the time is right.`)
    await createNewH1(`TO BE CONTINUED...`)
  }