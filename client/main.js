function setup() {
    fetchPhotos()
        .then(photos => {
            render(photos);
            zoomPhoto(photos[0]);
            handleSearchForm(photos);
        });

}

function handleSearchForm(photos) {
    const $area = document.querySelector('.container');
    const $input = document.createElement('input');
    $area.appendChild($input);
    $input.addEventListener('keypress', () => {
        const value = $input.value.toLowerCase();
        const filteredPhotos = photos.filter(photo => photo.title.toLowerCase().match(value));
        render(filteredPhotos);
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

    return fetch('http://localhost:3000/photos')
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
    const $div = document.createElement('div');
    $area.appendChild($div);

    $div.innerHTML += template;
}

window.addEventListener('DOMContentLoaded', setup);
