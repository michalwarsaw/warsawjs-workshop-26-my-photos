function setup() {
    fetchPhotos()
        .then(photos => {
            render(photos);
            zoomPhoto(photos[0]);
        });

}

function removeFullPhoto() {
    const $full = document.querySelector('.full');
    if ($full) {
        $full.remove();
    }
}

function zoomPhoto(photo) {
    removeFullPhoto();
    const $area = document.querySelector('.container');
    const $img = document.createElement('img');
    $img.classList.add('full');
    $img.setAttribute('src', photo.image);
    $area.appendChild($img);
    displayPhotoDetails(photo);


}

function fetchPhotos() {

    return fetch('/photos')
        .then(res => res.json());

}

function render(photos) {
    const $area = document.querySelector('.container');
    photos.forEach((photo) => {
        const $img = document.createElement('img');
        $img.setAttribute('src', photo.thumb);
        $area.appendChild($img);
        $img.addEventListener('click', () => {
            zoomPhoto(photo);
        });
    });

}

function displayPhotoDetails(photo) {
    const template = `<p>${photo.tags.join(', ')}</p> <p>${photo.title}</p>`;
    const $area = document.querySelector('.container');
    const $div = document.createElement('.div');
    $area.appendChild($div);

    $div.innerHTML += template;
}

window.addEventListener('DOMContentLoaded', setup);
