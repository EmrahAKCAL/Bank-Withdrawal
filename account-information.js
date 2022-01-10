var passwRight=3, Id, dt=new Date().toLocaleString();  

var accountInform=[{
    name: 'EMRAH AKÇAL', //Kullanıcı adı
    accountNu: 696032,   //Hesap numarası
    password: 2002,      //Şifresi
    balance: 20000,      //Hesap bakiyesi
    accountAdd: 3000     //Ek hesap bakiyesi
},
{
    name: 'NEHİR GEYİK',
    accountNu: 185614,
    password: 1234,
    balance: 15000,
    accountAdd: 1500
},
{
    name: 'BÜŞRA AKÇELİK',
    accountNu: 753821,
    password: 5678,
    balance: 30000,
    accountAdd: 2000
},
{
    name: 'ZÜLEYHA KAPLAN',
    accountNu: 247131,
    password: 1212,
    balance: 24000,
    accountAdd: 1000
},
{
    name: 'MEHMET BAŞARAN',
    accountNu: 291529,
    password: 1422,
    balance: 18000,
    accountAdd: 4000
}];

var useracount=Number (prompt('Hesap numaranızı giriniz.')); //Hesap numarası isteği

switch(true){    //hesap numarası kontrolü
    case useracount=== 696032: Id=0; break; 
    case useracount=== 185614: Id=1; break;
    case useracount=== 753821: Id=2; break;
    case useracount=== 247131: Id=3; break;
    case useracount=== 291529: Id=4; break;
    default:{
        confirm(`${useracount} numaralı hesap bulunamadı.`); break; //hesap bulunmama durumu
    }
}


if(useracount===accountInform[Id].accountNu){     //girilen hesap numarası ile kayıtlı hesap karşılaştırılması

var password=Number(prompt('Şifrenizi giriniz.')); //kullacıdan hesabın şifresi isteme durumu
if(password==accountInform[Id].password){      //girilen şifre ile hesaptaki şifre ile aynı ise
    var user=Id;  //hesap doğrulandığında dizi indeksi 
}
else {  //girilen şifre hesaptaki şifreyle aynı değilse
    for(let i=1; i<3; i++) //kullanıcıya şifreyi tekrar girme hakkı sunuldu
    {
        passwordRight=passwRight-i; //kaç tane şifre hakkı kaldığını hesaplaması

        password=Number(prompt(`Yanlış şifre girdiniz! \nLütfen şifre giriniz: ${passwordRight}`)); //tekrardan şifre girme durumu
        
        if(password==accountInform[Id].password){ //eğer girilen şifre hesap şifresiyle aynı ise
            var user=Id; break; //hesap doğrulandığında dizi indeksi
        }

        if(passwordRight===1){ //kullanıcı 3 defa yanlış şifre girerse
            confirm(`Çok fazla yanlış şifre girdin. Hesabına girişini geçici olarak durdurduk.\n Lütfen müşteri hizmetleri ile görüşünüz.\n\n +90 212 123 00 00`); //confirm kutunda kullanıcıyı bilgilendirme
        }
    }
}    

console.log(`....HOŞ GELDİNİZ.....\n\t\t\t${dt}\n\nAdı Soyadı: ${accountInform[user].name} \nHesap numarası: ${accountInform[user].accountNu}`); //kullanıcının kimlik bilgisi ve işlem tarihi-saati konsola yazdırıldı.
sum=Number(prompt(`Çekmek istediğiniz tutarı giriniz:`)); //çekilecek tutarı giriş isteği

moneywithdraw(accountInform[user], sum); //fonksiyana konumlandırıldı


function moneywithdraw(account, amount){ //fonsiyon tanımanıldı
    
    if(account.balance>=amount){ //kullanıcının hesabındaki para girilen tutardan fazla veya eşit ise 
        account.balance=account.balance-amount; //kullanıcının normal hesabında kalan para hesaplanıldı
        console.log(`.....Çekilen Tutar.....\nNormal hesap ${amount} TL \nEk hesap: 0 TL \nToplam: ${amount} TL`); //çekilen bakiye bilgisi konsola yazdırıldı
        console.log(`.....Kalan Bakiye.....\n Normal hesap: ${account.balance} TL\nEk hesap:\t  ${accountInform[user].accountAdd} TL`); //kullanıcının hesaplarında kalan bakiye hesaplanıp konsola yazdırıldı
        
    }

    else{ // girilen tutar kullanıcının hesabındaki paradan fazla ise gerçekleşecek olay

        var total= account.balance + account.accountAdd; //kullanıcının hesaplarında kalan toplam bakiye hesaplanıldı
        
        if(total>=amount){ //toplam bakiye girilen tutardan fazla veya eşit ise
            
            if(confirm(`Normal hesabınızdan yeterli bakiye bulunmamaktadır.\n\n Ek hesabı kullanak ister misiniz?`)){ //kullanıcı ek hesabı kullanmak isteğini soruldu
                
                remainder=accountInform[user].accountAdd-(amount- account.balance); //ek hesapta kalan bakiye hesaplanıldı
                takenBalance=amount-(amount- account.balance); //normal hesabında çekilen bakiye hesaplanıldı
                takenAccountAdd=amount- account.balance;  //ek hesabında çekilen bakiye hesaplaması
                
                console.log(`.....Çekilen Tutar.....\nNormal hesap: ${takenBalance} TL\nEk hesap:\t  ${takenAccountAdd} TL \nToplam:\t\t ${amount} TL`); //çekilen para bilgisi konsola yazdırıldı
                
                console.log(`.....Kalan Bakiye.....\nNormal hasap: 0 TL \nEk hesap:\t  ${remainder} TL \nToplam:\t\t ${remainder} TL`); //hesaplarında kalan bakiye konsola yazdırıldı

                var balance=account.balance; //kullanıcı bakiyesi değiştirldi
                var accountAdd=amount-balance; //ek hesap değiştirildi
                var remainder, takenBalance, takenAccountAdd; 
                account.balance=0;
                account.accountAdd=account.accountAdd-accountAdd; 
                
                
            }
            
            else{
                confirm(`${accountInform[user].accountNu} Nolu hesabınızda ${amount} TL bulunmamaktadır.`);
            }
        }

        else{
            confirm(`Limit aşımı.`);
        }
    }
}
}
