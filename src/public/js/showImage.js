image_array = ["1.jpg", "2.jpg", "3.jpg"];

function getRandomImage() {
  const random_index = Math.floor(Math.random() * image_array.length);
  const selected_image = image_array[random_index];

  document.getElementById("img_shower").src = `./public/imgs/${selected_image}`;
  console.log(__dirname);
}
