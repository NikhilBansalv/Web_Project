// Add click event to button
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btn');
    if (btn) {
        btn.addEventListener('click', () => {
            document.getElementById('demo').innerHTML = "Button Clicked! Text Updated.";
        });
    }
});

function completed(){
    alert("The course is completed!");
}