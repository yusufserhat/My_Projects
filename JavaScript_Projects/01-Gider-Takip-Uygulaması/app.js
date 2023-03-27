//* böyle tek tek inputları yakalyıp change eventi tanımlamak yerine aşağıda yakaladığımız formun childNodeslarında gezinip her birine change eventı tanımlamış olduk.
// const giderText= document.getElementById("giderText");
// const giderTarih= document.getElementById("giderTarih");
// const giderMiktar= document.getElementById("giderMiktar");

//? declaration
const giderForm = document.getElementById("giderForm");//form
const tableBody = document.getElementById("table-body");//tbody
const gelirVal = document.getElementById("gelir-val");//gelir bilgisinin girildiği input
const gelirEkle = document.getElementById("ekle");// gelirin eklendiği button
const kalanDiv = document.getElementById("kalan");// toplam bilgilerinin gösterildiği alan
const myDate = document.getElementById("giderTarih");// tarihin seçildiği inputa min ve max dğerlerini tanımlamak için yakaladığımız input.
const alertDiv = document.getElementById("alert");// uyarıyı gösterdiğimiz div
const temizle = document.getElementById("temizle");// bilgilerin hepsini temizlemek için kullanılan buton

//! inputun min ve max tarihlerini belirleme
myDate.max = `${new Date().toLocaleDateString("en-ca").replaceAll(".", "-")}T23:59:00`;//inputun max attribute u değer olarak bekledği tarih formatına uyarladık => 2023-01-20T23:59:00 

const month =new Date().getMonth() < 9 ? "0" + (Number(new Date().getMonth()) + 1): (Number(new Date().getMonth()) + 1);//getMonth() metodu 0 - 11 arasında değer döndüğü için burada algoritma kurup içinde bulunduğumuz ayın tek haneli olup olmadığını yakalyıp tek haneliyse başına 0 ekliyoruz ve gelen değere asıl ayı bulmak için 1 ekliyoruz.

myDate.min = `${new Date().getFullYear()}-${month}-01T00:00:00`;//gün ve saat sabit olduğu için ay ve yıl bilgisini dinamik bir şekilde alıyoruz

//! gelir bilgisinin eklendği alan
let gelir = Number(localStorage.getItem("gelir")) || 0;
gelirEkle.addEventListener("click", () => {
  gelir = gelir + Number(gelirVal.value);//kullanıcı birden fazla gelir ekleyebilir
  localStorage.setItem("gelir", gelir);
  gelirVal.value = "";
  kalanHesapla();
});

//! formdaki bilgileri toplamak için bir obje tanımladık. Ve key isimleriyle inputlardaki name attirubutelerindeki isimleri aynı tanımladık.
let initialState = {
  id: "",
  yer: "",
  tarih: "",
  miktar: "",
};

//! harcamaları tutacağımız arrayi oluşturduk 
let myArr = [];

//! load işlemi olduğunda localden bilgileri çekmek için
window.addEventListener("load", () => {
  myArr = JSON.parse(localStorage.getItem("harcamalar")) || [];
  if (myArr.length > 0) {//myArr doluysa forEach yapıyoruz
    myArr.forEach(item => getCreateElem(item));
  }
  kalanHesapla();//başlangıçta toplam bilgilerinin gösterilmesi için çağırıyoruz
});

//! formdaki bilgilerin change eventi tetiklendiğinde initialState e atmak için tanımladığımız fonksiyon
const handleChange = (e) => {
  e.preventDefault();
  initialState = { ...initialState, [e.target.name]: e.target.value };//name attributelarından gelen değer ile initialState objesinde bulunan değer aynı olduğu için ilgili keyi bracket notation la güncellemiş oluyoruz. yani e.targetın name inden yer değeri geliyor.gelen değer string olduğu için bracket notation kullanıyoruz.["yer"]:"market" vb.gibi
};

//! formun submit işleminin gerçekleştiği alan
giderForm.addEventListener("submit", (e) => {
  e.preventDefault();// formun kendine ait özelliklerini durduruyoruz.
  initialState = { ...initialState, id: new Date().getTime() };//oluşturğumuz initialState objesininin id değerini güncelliyoruz. Silme işleminde kullanacağız
  myArr.push(initialState);// arrayimize veriyi ekliyoruz
  localStorage.setItem("harcamalar", JSON.stringify(myArr));//arrayi localStorage a ekliyoruz
  getCreateElem(initialState);//htmle eklemek için fonksiyona objemizi parametre olarak gönderiyoruz
  kalanHesapla();// arrayimiz güncellendiği için toplam bilgilerinin de güncellenmesi gerekiyor
  initialState = {
    id: "",
    yer: "",
    tarih: "",
    miktar: "",
  };// initialstate objesini başlangıç haline döndürüyoruz
  giderForm.reset();//formu boşaltıyoruz
});

//! harcamalar tablosunu oluşturduğumuz kısım
function getCreateElem(item, i) {
  const newElem = `
       <td>${new Date(item.tarih).toLocaleString("tr-TR")}</td>
      <td class="text-capitalize">${item.yer}</td>
      <td>${item.miktar} ₺</td>
      <td class="silme">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" role="button" class="bi bi-trash3" viewBox="0 0 16 16">
          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
        </svg>
    </td>`
    ;
  const tr = document.createElement("tr");
  tr.setAttribute("id", item.id);// objeye verdiğimiz id tr elementinin id bilgisine tanımlamış olduk
  tr.innerHTML = newElem;
  tableBody.prepend(tr);//başa eklemek için prepend kullandık
}

//! silme işlemini gerçekleştirdiğimiz kısım.
tableBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("bi-trash3")) {
    const id = e.target.parentElement.parentElement.getAttribute("id"); //içinde bulunduğu tr elementinin id sini yakaladık
    e.target.parentElement.parentElement.remove(); //Uı den sildik
    myArr = myArr.filter((gider) => gider.id != id); // arrayden silmiş olduk
    localStorage.setItem("harcamalar", JSON.stringify(myArr)); //locali update etmiş olduk
    kalanHesapla(); // total bilgilerini güncellemiş olduk
    let myAlert = `
      <div
        class="alert alert-success w-50 d-flex justify-content-between"
        role="alert">
        <span>Harcamayı başarıyla sildiniz!</span>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"></button>
      </div>
    `; //alert verdirmek için
    alertDiv.innerHTML = myAlert;
    setTimeout(() => {
      alertDiv.innerHTML = "";
    }, 3000); //alerti 3 saniye sonra kaldırmak için
  }
});

//! change evntlarını tanımladığımız alan
giderForm.childNodes.forEach((elem) =>
  elem.addEventListener("change", handleChange)
);//form elemntinin childNodeslarında gezinerek her birine change eventı tanımlamış olduk.Aşağıdaki gibi tek tek uğraşmadık;

// giderText.addEventListener("change",handleChange);

// giderTarih.addEventListener("change",handleChange);

// giderMiktar.addEventListener("change",handleChange);


//! toplam bilgilerinin hesaplandığı alan
function kalanHesapla() {
  const totalHarcama = myArr.reduce((acc, har) => acc + Number(har.miktar), 0);
  const kalanMiktar = gelir - totalHarcama;
  kalanDiv.innerHTML = `
  <tr>
  <th><span>Geliriniz</span></th>
  <td><span>: ${gelir} ₺ </span></td>
  </tr>
  <tr>
  <th><span>Gideriniz</span></th>
  <td><span>: ${totalHarcama} ₺ </span></td>
  </tr>
  <tr>
  <th><span>Kalan</span></th>
  <td><span>: ${kalanMiktar} ₺ </span></td>
    `;
}

//! bütün bilgilerin temizlendği alan
temizle.addEventListener("click",()=>{
  myArr = [];
  localStorage.clear();
  kalanHesapla();
  tableBody.innerHTML="";
})