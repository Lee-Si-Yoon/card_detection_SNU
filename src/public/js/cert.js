const certDate = document.querySelectorAll(".cert__date");
const certNumber = document.querySelector(".cert__number");

const dt =
  new Date().getFullYear() +
  "년" +
  (new Date().getMonth() + 1) +
  "월" +
  new Date().getDate() +
  "일";
const rn = Math.floor(Math.random() * 899999 + 100000);

console.log(rn);

for (let index = 0; index < certDate.length; index++) {
  certDate[index].innerHTML = dt;
}

certNumber.innerHTML = `학위번호: 서울대${rn}`;
