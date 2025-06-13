
const payment_portal = document.getElementById('payment_portal');
payment_portal.style.display = 'block';
const billing_portal = document.getElementById('billing_portal');
billing_portal.style.display = 'none';
var dest, hotel_chosen, no_of_rooms;

document.getElementById("purchase_list").innerHTML = "";

const hotel_dataset = {
  Delhi: [
    { value: "delhi_1", name: "The Imperial", price: 15000 },
    { value: "delhi_2", name: "Taj Mahal Hotel", price: 20000 },
    { value: "delhi_3", name: "The Leela Palace", price: 5000 }
  ],
  Mumbai : [
    { value: "mumbai_1", name: "The Oberoi", price: 9000 },
    { value: "mumbai_2", name: "St. Regis", price: 12000 },
    { value: "mumbai_3", name: "Four Seasons Hotel", price: 20000 }
  ],
  Bangalore: [
    { value: "bangalore_1", name: "Taj West End", price: 20020 },
    { value: "bangalore_2", name: "The Ritz-Carlton", price: 15500 },
    { value: "bangalore_3", name: "ITC Gardenia, a Luxury Collection Hotel", price: 9200 }
  ]
};
const destination_selected = document.getElementById('destinations');
const hotel_selected = document.getElementById('hotels');
const no_rooms_selected = document.getElementById('rooms');
const total_price_element = document.getElementById('total_price');

destination_selected.addEventListener('change', function() {
  hotel_selected.innerHTML = '<option value="">Select</option>';
  hotel_selected.disabled = true;

  const destination = this.value;
  if (hotel_dataset[destination]) {
    hotel_dataset[destination].forEach(hotel => {
      const option = document.createElement('option');
      option.value = hotel.value;
      option.textContent = hotel.name;
      hotel_selected.appendChild(option);
    });
    hotel_selected.disabled = false;
  }
});

function updateDisplay() {
  const dest = destination_selected.value || "Not selected";
  const hotel = hotel_selected.options[hotel_selected.selectedIndex]?.text || "Not selected";
  const rooms = no_rooms_selected.value && Number(no_rooms_selected.value) > 0 ? no_rooms_selected.value : 0;
  
  let total_price = 0;
  if (hotel_selected.value && no_rooms_selected.value && Number(no_rooms_selected.value) > 0) {
    const selected_destination = destination_selected.value;
    const selected_hotel_value = hotel_selected.value;
    const hotel_data = hotel_dataset[selected_destination]?.find(hotel => hotel.value === selected_hotel_value);
    if (hotel_data && hotel_data.price) {
      total_price = `$${hotel_data.price * Number(no_rooms_selected.value)}`;
    }
  }

  const a = "destination: " + dest + "<br>hotel: " + hotel + "<br>no of rooms: " + rooms;
  document.getElementById("purchase_list").innerHTML = a;
  document.getElementById("total_price").innerHTML = total_price;
  bill_dest_value = dest;
  bill_rooms_value = rooms;
  bill_hotel_value = hotel;
  bill_amount_value = total_price;
}

//
function showPaymentMethod(method) {
  const elements = document.getElementsByClassName(method);
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.display = 'block';
  }
  if (method === 'card_visa_div') {
    const elements = document.getElementsByClassName('gpay_paytm_paypal_div');
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.display = 'none';
    }
    document.getElementById('cashp').innerHTML = '';
  }
  if (method === 'gpay_paytm_paypal_div') {
    const elements = document.getElementsByClassName('card_visa_div');
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.display = 'none';
    }
    document.getElementById('cashp').innerHTML = '';
  }
  if (method === 'cash'){
    const elements = document.getElementsByClassName('card_visa_div');
    const elements2 = document.getElementsByClassName('gpay_paytm_paypal_div');
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.display = 'none';
      elements2[i].style.display = 'none';
    }
    document.getElementById('cashp').innerHTML = 'Please pay the total amount in cash at the hotel reception.';
  }
}

destination_selected.addEventListener('change', updateDisplay);
hotel_selected.addEventListener('change', updateDisplay);
no_rooms_selected.addEventListener('input', updateDisplay);

updateDisplay();

function handleFormSubmit() {
  const dest = destination_selected.value;
  const hotel = hotel_selected.value;
  const rooms = no_rooms_selected.value;
  const selected_hotel = hotel_dataset[dest].find(h => h.value === hotel);
  const total_price = selected_hotel.price * Number(rooms);
  const billData = {
    destination: dest,
    hotel: selected_hotel.name,
    rooms: rooms,
    price_per_room: selected_hotel.price,
    total_price: total_price
  };
  // 
  
  const payment_portal = document.getElementById('payment_portal');
  payment_portal.style.display = 'none';
  const billing_portal = document.getElementById('billing_portal');
  billing_portal.style.display = 'block';

  var bill_number = 'B' + Math.floor(Math.random() * 10000);
  var first_name = document.getElementsByName('first_name_gen_details')[0].value;
  var last_name = document.getElementsByName('last_name')[0].value;
  var customer_name = first_name +' '+ last_name;
  var bill_date = new Date().toLocaleDateString();
  document.getElementsByClassName('bill_no')[0].innerHTML = bill_number;
  document.getElementsByClassName('bill_customer_name')[0].innerHTML = customer_name;
  document.getElementsByClassName('bill_date')[0].innerHTML = bill_date;
  document.getElementsByClassName('bill_dest')[0].innerHTML = dest;
  document.getElementsByClassName('bill_hotel')[0].innerHTML = selected_hotel.name;
  document.getElementsByClassName('bill_rooms')[0].innerHTML = rooms;
  document.getElementsByClassName('bill_amount')[0].innerHTML = '$' + total_price;
}

const canvas = document.getElementById('bg_canvas');
const ctx = canvas.getContext('2d');

if (!canvas || !ctx) {
  console.error('Canvas or context not supported');
}
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const squares = Array.from({ length: 5 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  size: 30 + Math.random() * 40,
  speedX: (Math.random() - 0.5) * 2,
  speedY: (Math.random() - 0.5) * 2,
  angle: 0,
  rotationSpeed: (Math.random() - 0.5) * 0.05
}));

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  squares.forEach(square => {
    square.x += square.speedX;
    square.y += square.speedY;
    square.angle += square.rotationSpeed;

    if (square.x < 0 || square.x > canvas.width) square.speedX *= -1;
    if (square.y < 0 || square.y > canvas.height) square.speedY *= -1;

    ctx.save();
    ctx.translate(square.x, square.y);
    ctx.rotate(square.angle);
    ctx.fillStyle = 'rgba(178, 180, 180, 0.33)';
    ctx.fillRect(-square.size / 2, -square.size / 2, square.size, square.size);
    ctx.restore();
  });

  requestAnimationFrame(animate);
}
animate();