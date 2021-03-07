

export default function showErrorNotification(element)  {
    element.style.display = "block";
    setTimeout(() => {
      element.style.display = "none";
    }, 2000);
}