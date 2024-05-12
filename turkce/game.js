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

        document.addEventListener('touchstart', function(event) {
            if (event.type === 'touchstart') {
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
        const eventHandler = function(event) {
            if (event.keyCode === 32 || event.type === 'touchstart') {
                document.removeEventListener('keydown', eventHandler);
                document.removeEventListener('touchstart', eventHandler);
                resolve();
            }
        };
  
        document.addEventListener('keydown', eventHandler);
        document.addEventListener('touchstart', eventHandler);
    });
}


// oyun zevkini bozmamasi icin sag tiki devre disi yapiyoruz, (kodlar gozukmesin diye yaptim) saka saka ACIK KAYNAK PAYLASIYORUM (zaten kodlari saklamyamam... aslinda bu kodlari gormenizi istemezdim lutfen cok yargilamayin :3)
window.addEventListener('contextmenu', function (e) { e.preventDefault(); }, false);


startgameBtn.addEventListener('click', startGame)

async function startGame() {
    clear()
    await newImg('/img/woodhouse.png');
    await createNewH1(`Bilgisayar korsanlığı serüveninden uzaklaşıp doğanın içinde huzur bulmaya çalıştığından beri uzun zaman geçti. Şimdi burada, ağaçların fısıldayışları ve yakınlardaki dere sesi eşliğinde, beklenmedik bir huzur hissi buldum.`);
    await createNewH1(`Eski, tozla kaplı telefonundan gelen ani bir vızıltı sessizliği bozdu. Geçmişinden bir hayalet, dijital yeraltında bir yol arkadaşı olan Avunit'ten gelen bir mesaj. Sözleri içinde bir merak kıvılcımını ateşledi.`);
    await createNewH1(`"Büyük bir şeyi gizliyorlar. Evrenle ilgili bir şey. Sana ihtiyacımız var."`);
    await questionOne();
}

async function questionOne() {
    allgame.appendChild(question('yes', 'Mesajla ilgilen'));

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
    await createNewH1(`Hey, benim, Avunit. ${nickname}, uzun zaman oldu, değil mi? Dinle, her şeyi geride bıraktığını biliyorum ama bir fırtına yaklaşıyor. Gölgelerde gizlenen bir şey var, hükümetin görmemizi istemediği bir şey. Bildiğimiz az şey bunun evrenle ilgili bir şey olduğunu gösteriyor, ölçülemeyecek kadar büyük bir şey. Ama çıkmaz sokaklara giriyoruz. Bu gizemi çözmek için senin uzmanlığına, sezgilerine ihtiyacımız var. Bize katılacak mısınız?`);
    await questionTwo()
}

async function qOneEnd() {
    clear();
    await newImg('/img/retire.png')
    await createNewH1('SON');
    await createNewH1(`Emeklilik sana yakışıyor. Ormanın sükûneti senin ödülün. Avunit'in mesajı hakkında soru işaretleri olsa da, seçtiğiniz yolda huzur buluyorsunuz.`)
}

async function questionTwo() {
    allgame.appendChild(question('yes', 'Gösteri zamanı'));
    allgame.appendChild(question('no', 'Emekliliğin tadını çıkarmaya devam et'));

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
    await createNewH1(`Uzakta yükselen şehir manzarası, geride bıraktığınız huzurlu ormana tam bir zıtlık oluşturuyor.`)
    await createNewH1(`"Evren mi? Evren hakkında ne saklıyor olabilirler? Yoksa uzaylılar gerçek mi :D?"`);
    await createNewH1(`Kesin olan bir şey var ki, eğer Avunit bunca yıl sonra bana ulaştıysa, bu ciddi bir durumdur. Neler olduğunu öğrenmenin zamanı geldi.`)
    await waitForSpace()
    await backToCity()
}

async function backToCity() {
    clear();
    await newImg('img/citypeople.png');
    await createNewH1(`Şehrin senfonisi sizi sarıyor araba kornaları, uzaktaki sirenler, sayısız sesin gevezeliği. Çelik ve cam kuleler gökyüzünü delip, aşağıdaki kalabalık caddelerin üzerine uzun gölgeler düşürüyor.`);
    await createNewH1(`Ancak şehrin karmaşası sizi rahatsız eden şeyden uzaklaştıramaz. Avunit'in mesajı, bir gizem tohumu, kök saldı ve çiçek açmasını görmek için sabırsızlanıyorsunuz.`)
    await waitForSpace()
    await arriveHome()
}

async function arriveHome() {
    clear();
    await newImg('img/monitors.png');
    await createNewH1('Evinize girdiğinizde eski bilgisayarınızın ve monitörlerinizin tozlandığını görüyorsunuz. Burada geçirdiğiniz sayısız geceyi, klavyenin üzerinde uçuşan parmakları, kod satırlarına yapışmış gözleri hatırladıkça içinizi bir nostalji kaplıyor.')
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
    await createNewH1('ahh.. Şifrem neydi?')
    const passValue = document.getElementById('signininput')
    const passwordHint = document.getElementById('hint')
    const hintText = document.getElementById('passwordhint')
    const errorMsg = document.getElementById('errorMsg')

    passwordHint.addEventListener('click', () => {hintText.innerHTML = `şu anda ekranınızda şifreyi görüyorsunuz... </br> neden adres çubuğunun üst kısmına bakmıyorsunuz?  </br> i***1`});
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
                                <p style="font-size: 1.8rem; margin: 5px;">tekrar hoşgeldin dostum</p>
                                <p style="margin: 5px; font-size: 1.1rem;">Polisler Bugüne kadar hala gizli posta servisini bulamadılar. :D Bu posta servisini yarattığın gün bana fazla bir şey olmadığını söylemistin.</p>
                                <p style="margin: 5px; font-size: 1.1rem; margin-top: 10px;">James Webb Uzay Teleskobu'nu duymuş olmalısın. Bize uzaydan sayısız görüntü gönderiyor. İçerideki arkadaşım bana bazı bilgiler verdi. Görünüşe göre, bizimle paylaştıkları görüntüler ellerinde olanin sadece %1'i. Bu da ellerinde binlerce resim olduğu anlamına geliyor. Sakladıkları bir şey olmalı. Sistemlerine girmeliyiz, ama güvenlikleri en üst seviyede. Sunucularına fiziksel erişim olmadan onları hacklemenin bir yolunu düşünemiyorum.</p>
                                <p style="margin: 5px; font-size: 1.1rem; margin-top: 10px;">Sana araştırdığımız ve bulduğumuz bazı şeyleri içeren bir dosya gönderiyorum, bir göz at.</p>

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
    await createNewH1(`Hmm... Avunit'in mesajı, ha?`)
    await createNewH1(`Sadece %1'i mi paylaşıldı? Bizden ne saklıyor olabilirler? Bulmacanın büyük bir parçasını kaçırıyormuşuz gibi geliyor. Doğrudan hacklemeye atlamak riskli görünüyor. Daha akıllıca düşünmeliyiz. Önce daha fazla bilgi toplamak iyi olabilir.`)
    const inf = document.getElementById('info')
    inf.addEventListener('click', infoFile)
}

async function infoFile() {
    clear()
    const info = document.createElement('div')
    info.innerHTML = `<div style="width: 100%; height: 60vh; border: 1px solid white; display: flex; color: black; align-items: center; justify-content: space-between; flex-direction: column; background-image: url(https://res.cloudinary.com/canonical/image/fetch/f_auto,q_auto,fl_sanitize,c_fill,w_960,h_601/http://design.canonical.com/wp-content/uploads/wallpaper_blog_post.jpg); background-repeat: no-repeat; background-position: center center;">
                        <div class="txt" id="txt" style="background-color: rgb(202, 202, 202); width: 50vh; height: 32vh; overflow-y: auto; border: 1px solid rgb(17, 17, 17); display: flex; flex-direction: column; padding: 10px; margin-top: 6rem;">
                            <p style="margin: 0; font-size: 1.2rem;">James Webb ile iletişim kurmak için Goldstone Radyo Teleskobu'nu kullanıyorlar</p>
                            <p style="margin: 0; margin-top: 0.7rem; font-size: 1.2rem;">güvenlik son derece yüksek, 10 km'lik bir yarıçap içinde sadece yetkili erişime izin veriliyor, polis sürekli devriye geziyor</p>
                            <p style="margin: 0; margin-top: 0.7rem; font-size: 1.2rem;">sistemi uzaktan hacklemek imkansızdır (${nickname} olsa bile)</p>
                            <p style="margin: 0; margin-top: 0.7rem; font-size: 1.2rem;">İçerideki adamımız bizi içeri sokabilir ama bu bile çok riskli, içerideki güvenlik tarafından yakalanabiliriz. İçeri girdikten sonra ana bilgisayarı hacklememiz ve verileri kendi sistemlerimize yönlendirmemiz gerekiyor.</p>
                            <p style="margin: 0; margin-top: 0.7rem; font-size: 1.2rem;">35° 25′ 36″ N, 116° 53′ 24″ W</p>                               
                        </div>

                        <div style="background-color: gray; width: 100%; height: 2rem; display: flex; align-items: center;">
                            <span style="margin: 0; font-size: 1rem; margin-left: 5px; cursor: pointer;">Menu</span>
                            </div>
                    </div>
                    </div>`
        allgame.appendChild(info)  
        await createNewH1(`"Benim için bile uzaktan hacklemek imkansız mı?" :D`)
        await waitForSpace()
        await aloneOrFiziksel()
}

async function aloneOrFiziksel() {
    clear()
    await newImg('/img/monitors2.png')
    await createNewH1("Monitörlerin ışığı yüzünüzü aydınlatıyor");
    await createNewH1("Avunit'le tanışmak mı... Hayatımı üzerine kurduğum her şeye ters düşüyor. Şimdiye kadar tek kuralım, kimseyle buluşmamak. Bu yüzden polise yakalanmıyorum, kimseyle buluşamam. Anonimlik benim kalkanım, dünyaya karşı savunmam.");
    await createNewH1("Ama bu durum... farklı. Riskler daha yüksek. Belki de sadece birlikte çalışarak bu hack mümkün olabilir.");
    await createNewH1(`Siktir. Ne yapacağımı bilmiyorum.`)
    await questionRule()
}

async function questionRule() {
    allgame.appendChild(question('yes', `Anonim kal ve uzaktan halletmeye çalış`));
    allgame.appendChild(question('no', `Avunit ile buluş`));

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
    await createNewH1(`Birkaç gün oldu, yeterince uyuyamıyorum ama hacklemeye çok yakınım`)
    await createNewH1(`Kuralımı bozmayıp uzaktan halletmeye çalışmam, Avunit'i kızdırdı, ama kuralımı bozamazdım...`)
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
    await createNewH1(`Sonunda yaptım, normalden çok daha uzun sürmesine rağmen, şimdi tek gereken sunucu ip adresimizi (218.108.149.373) yazmak ve Enter'a basmak, sonra onlara gelen tüm veriler bize gelecek. bunun ${nickname} için bile imkansız olduğunu kim söyledi? Tamam, tamam, Avunit bana kızmasına rağmen bilgileri paylaşmasaydı bunu yapamayabilirdim.`)

    const hackInput = document.getElementById('hackinput');
    
    hackInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
          const enteredIP = hackInput.value;
          if (enteredIP === '218.108.149.373') {
            avunitFbi()
          } else {
            createNewH1(`Aptal gibi ip adresini yanlış yazdım, ellerim titriyor..`);
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
                                        <h1 style="margin: 0; margin-top: 3rem; margin-left: 0.5rem; color: rgb(65, 80, 50);">İsimsiz ihbarınız için teşekkür ederiz</h1>
                                        <p style="margin: 0; margin-left: 0.5rem; margin-top: 5px; font-size: 1rem; width: 30rem;">İsimsiz raporunuzu başarıyla aldık, desteğiniz için teşekkür ederiz, bu sayfayı şimdi kapatabilirsiniz.</p>
                                    </div>
                            </div>
                            <div style="background-color: gray; width: 100%; height: 2rem; display: flex; align-items: center;">
                                <span style="margin: 0; font-size: 1rem; margin-left: 5px; cursor: pointer;">Menu</span>
                                </div>
                        </div>
                        </div>`
    allgame.appendChild(avunitTip)
    await createNewH1(`Çok özür dilerim, ${nickname}, ama bunu yapmak zorundaydım.`)
    await createNewH1(`En iyi hacker olduğunu biliyorum, ama bütün bunlar... bizim ligimizin çok dışında. Eğer devam etseydin, hepimizi yakalatabilirdin. Sana verdiğim IP... bu bir tuzak. Polis yakında kapını çalacak. Ben sadece... bunu riske atamazdım, anlıyor musun? Grubumuzu ve kendimi korumak zorundaydım.`)
    await waitForSpace()
    iDid()  
}

async function iDid() {
    clear()
    await newImg('/img/ididit.png')
    await createNewH1(`Sonunda... zor oldu ama uzaktan yapılabileceğini kanıtladım hahahaha, şimdi Avunit'ten şokunu ifade eden bir mail bekliyor olacağım :D`)
    await createInsantNewH1('Kapı zili mi o? Burada hayalet gibi yaşıyorum. Kim olabilir?')
    await waitForSpace()
    fbiDoor()
}

async function fbiDoor() {
    clear()
    await newImg('/img/fbiend.png')
    await createNewH1(`"KNOCK KNOCK MOTHER FUCKER"`)
    await createNewH1(`Avunit... seni sattı. Çok derine indiğinizi, ikinizi ve grubu ifşa edeceğinizi düşündü.`)
    await createNewH1("Ama FBI yıllardır seni izliyor. Yeteneklerini biliyorlar.");
    await createNewH1("Şimdi de sana bir çıkış yolu öneriyorlar. Onlar için çalış, yeteneklerini diğer hackerları yakalamak için kullan ve onlar da senin geçmişini unutsunlar.");
    await fbiQuest()
}

async function fbiQuest() {
    allgame.appendChild(question('yes', `Anlaşmayı kabul et`));
    allgame.appendChild(question('no', `Reddedin ve sonuçlarıyla yüzleşin`));

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
    await createNewH1('FBI sadece seninle dalga geçiyordu:D')
    await createNewH1('SON')
    await waitForSpace()
    clear()
    const catvid = document.createElement('div')
    catvid.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/L8XbI9aJOXk?si=Fkw7WjXtyHoDIiL4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
    allgame.appendChild(catvid)
}

async function giveUp() {
    clear()
    await createNewH1(`Yargıç cezanızı açıklarken sesi soğuk ve kesindir: ömür boyu hapis`)
    await createNewH1("Geçmişte işlediğiniz suçların ağırlığı üzerinize çöküyor.")
    await createNewH1(`...`)
    await createNewH1("Yıllar on yıllara dönüşür. Hapishane duvarları içinde bir efsane haline gelirsiniz, sistemi neredeyse kıran kötü şöhretli hacker")
    await createNewH1("Bir gün, genç ve hırslı bir mahkûm size yaklaşır ve rehberliğinizi ister...")
    await createNewH1("(Devam edecek...?)") // elbet bir gun... :D
}

async function bulusma() {
    clear()
    await newImg('/img/handshake.png')
    await createNewH1(`İlk kez kendi kuralınızı çiğnediniz ve Avunit'le tanıştınız, şimdi plan yapma zamanı...`)
    await createNewH1(`"Max bizim içerideki adamımız" diye açıklıyor Avunit, "Vardiya değişimi sırasında seni içeri sokacak.  İçeri girdikten sonra ana bilgisayara erişmek için sınırlı bir zamanınız olacak."`)
    await waitForSpace()
    await getIn()
}

async function getIn() {
    clear()
    await newImg('img/incar.png')
    await createNewH1(`Arabanın arka koltuğunun sıkışık karanlığında kıvrılmışken, midenizde bir gerginlik hissediyorsunuz.`)
    await createNewH1(`Max'in sakin tavrı güven vericidir ama risk de hissedilmektedir. Yanlış ya da şüpheli bir hareket operasyonun çökmesine neden olabilir.`)
    await waitForSpace()
    await check()
}

async function check() {
    clear()
    await newImg('img/check.png')
    await createNewH1(`Guvenlik arabaya yaklaşıyor, el feneriyle içeriyi tarıyor. Gölgelerin içine çekiliyorsunuz, kalbiniz göğsünüzde atıyor`);
    await createNewH1(`Güvenliğin sert ifadesi aniden yumuşayarak bir gülümsemeye dönüşür. "Max?  Seni gece vardiyasında görmeyi beklemiyordum! Her şey yolunda mı?"`);
    await createNewH1(`Max kıkırdar, "Sadece bir arkadaşıma vardiya borcum var. Önümde uzun bir gece var. "Güvenlik anlayışla başını sallar. "Anlıyorum, Max. İyi geceler."`);
    await createNewH1(`Güvenlik uzaklaşırken, tuttuğunuzu fark etmediğiniz nefesi serbest bırakırsınız. Bu çok yakındı...`);
    await waitForSpace()
    await wrap()
}

async function wrap() {
    clear();

    await createNewH1(`Ağır çelik kapıdan içeri adımınızı attığınızda gözlemevinin serin havası üzerinize çöküyor. Max sizi loş bir koridora götürüyor.`);
    await createNewH1(`"Seni burada bırakıyorum," diyor Max, sesi alçak. "Ana bilgisayar odası bu iki odadan biri. Güvenlik kameralarını on dakikalığına devre dışı bıraktım, ama ondan sonra kendi başınasın. İşin bitince bana haber ver. Hizlica çıkmamız lazım."`);

    allgame.appendChild(question('1', `Oda 1`));
    allgame.appendChild(question('2', `Oda 2`));


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
    await createNewH1(`Burası doğru oda değil! GERİ GİT APTAL! Zaman tükeniyor...`)
    await waitForSpace()
    await wrap()
}

async function enterRoom2() {
    clear();
    await newImg('/img/serverroom.png')
    await createNewH1(`Sunucular yanıp sönüyor, veri akıyor. işte bu!`)
    await createNewH1(`Tamam, şimdi bu güzelliği hızlıca hacklemelisin.`)
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

    await createNewH1(`GÜVENLIK SIZI YAKALAMADAN ÖNCE IP ADRESINI HIZLICA YAZIN!!! 192.251.68.249`)
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
    await createNewH1('Zaman doldu! Güvenlik seni yakaladı! SALAK!')
}

async function exitBuilding() {
    clear()
    await newImg('img/incar.png');
    await createNewH1('Erişim izni verildi bebeğim! Sunucuyu başarıyla hackledin!')
    await createNewH1(`Şimdi Max'le geri dön ve tekrar arabanın arkasına saklan.`)
    await waitForSpace()
    await callAvunit()
}

async function callAvunit() {
    clear()
    await newImg('img/phonecall.png');
    await createNewH1(`Avunit'in numarasını çeviriyor ve endişeyle telefonu açmasını bekliyorsunuz.`);
    await createNewH1(`"Avunit, tamamdır! sunucuyu hackledik. sistemi hemen kontrol et!" diyorsun acilen.`);
    await waitForSpace()
    await avunitpc();
}

async function avunitpc() {
    clear()
    await newImg('img/avunitpc.png');
    await createNewH1(`Avunit sistemi kontrol eder ve başarı karşısında gözle görülür bir şaşkınlık yaşar. Verileri analiz ederken ifadesi inançsızlıktan şoka dönüşür.`)
    await createNewH1(`"Bu gerçek olamaz..." diye mırıldanıyor kendi kendine, inanamayarak ekrana bakıyor.`)
    await createNewH1(`Avunit konuşurken sesi titriyor, "bu hayal ettiğim her şeyin ötesinde. derhal buraya gelmeniz gerekiyor"`);
    await waitForSpace()
    await maxandyou();
}

async function maxandyou() {
    clear()
    await newImg('img/incar.png');
    await createNewH1(`Max ve sen şaşkın bir sessizlik içinde oturmuş, Avunit'in ne görmüş olabileceğini anlamaya çalışıyorsunuz`)
    await createNewH1(`Avunit'in evine giden araba yolculuğu gergin, beklenti ve belirsizlikle dolu`)
    await createNewH1('Birbirinize gergin bakışlar atıyorsunuz, max ve sen kendi düşüncelerinizde kaybolmuşsunuz. Avunit neden bu kadar sarsılmıştı?');
    await createNewH1(`Avunit'in evinin önüne geldiğinizde kalbiniz heyecanla çarpıyor. Aradığınız cevaplar kapının hemen ardında yatıyor.`);
    await waitForSpace()
    await frontDoor()
}

async function frontDoor() {
    clear()
    await newImg('img/frontdoor.png')
    await createNewH1(`Avunit'in ön kapısına ulaşıp hafifçe vuruyorsunuz.`)
    await createNewH1(`Bir süre sonra kapı yavaşça açılır ve Avunit'in kapının girişinde, yüzünde ciddi bir ifadeyle durduğu görülür.`)
    await createNewH1(`"Konuşacak çok şey var" "İçeri gelin" diyor Avunit usulca, içeri girmeniz için kenara çekiliyor.`)
    await waitForSpace()
    await avunitRoom()
}

async function avunitRoom() {
    clear()
    await newImg('img/avunitroom.png')
    await createNewH1(`Avunit sizi odasına götürüyor.`)
    await createNewH1('Avunit masasında oturup bir süre bekledikten sonra, size barak')
    await createNewH1(`"Kendinizi hazırlayın" diyor sessizce, "birazdan göreceğiniz şey her şeyi değiştirebilir."`)
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
    await newImg('img/think.png')
    await createNewH1(`"Ne? Biz ne yaptık? Uzaylı uygarlıklar mı? Bunu neden saklıyorlar ki? inanılmaz"`)
    await createNewH1(`Keşfettiğiniz şeyin muazzamlığıyla boğuşurken odayı ağır bir sessizlik kaplıyor.`)
    await createNewH1(`Avunit, sesi ancak fısıltıyı aşan bir tonda, "bir sonraki adımlarımızı dikkatle düşünmemiz gerekiyor," diyor. "Bunu dünyaya açıklamak hayal bile edemeyeceğimiz sonuçlar doğurabilir."`)
    await createNewH1(`Ekrandaki görüntülere bakarken, içinizi bir huşu ve korku duygusu kaplıyor. Evrenin sırları önünüze seriliyor, ama ne pahasına?`)

    allgame.appendChild(question('1', `Dünya ile paylaşın`));
    allgame.appendChild(question('2', `Paylaşmayın`));


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
    await createNewH1(`insanlar dünya dışı uygarlıkların varlığını kabul etmekte zorlanırken, haberler panik ve kaosa neden oldu. dünyanın dört bir yanındaki hükümetler durumu kontrol altına almaya çalıştı ancak başarısız oldu.`)
    await createNewH1(`O kader kararına geri dönüp baktığınızda, gerçeği ortaya çıkarmanın doğru bir seçim olup olmadığını düşünmeden edemiyorsunuz. dünya bir daha asla eskisi gibi olmayacak ve eylemlerinizin sonuçları tarih boyunca yankılanmaya devam edicek`)
    await createNewH1(`SON`)
}

async function dontShare() {
    clear()
    await newImg('img/think.png')
    await createNewH1(`Uzun tartışmalardan sonra, siz ve Avunit dünya dışı uygarlıkların varlığını bir sır olarak saklamaya karar verdiniz ve görüntüleri dünyadan saklamayı tercih ettiniz.`)
    await createNewH1(`İkiniz de böylesine çığır açan bir bilgiyi açıklamanın sadece kaos ve istikrarsızlığa yol açacağı ve insanlığın Dünya'nın ötesindeki yaşam gerçeğiyle yüzleşmeye henüz hazır olmayabileceği konusunda hemfikirdiniz, sonraki yıllarda siz ve Avunit araştırmanıza gizlice devam ettiniz ve evrenin gizemlerini daha da derinlemesine araştırdınız.`)
    await createNewH1(`Yıldızlara bakarken, omuzlarınızda ağır bir sorumluluk duygusu hissetmekten kendinizi alamıyorsunuz. bu sırrı bilen birkaç kişiden birisiniz ve doğru zaman gelene kadar bu bilgiyi saklamaya yemin ediyorsunuz`)
    await createNewH1(`DEVAM EDECEK...`)
}