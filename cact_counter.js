
const counters = document.querySelectorAll('.counter');
const speed = 50; // The lower the slower

counters.forEach(counter => {
const updateCount = () => {
const target = +counter.getAttribute('data-target');
const count = +counter.innerText;

// Lower inc to slow and higher to slow
const inc = (target / speed).toFixed(0);

// console.log(inc);
// console.log(count);

// Check if target is reached
if (count < target) {
// Add inc to count and output in counter
// var addTo = count + inc;
// counter.innerText = addTo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
counter.innerText = count + inc;
// Call function every ms
setTimeout(updateCount, 1);
} else {
//counter.innerText = target;
counter.innerText = target.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
};

updateCount();
});
