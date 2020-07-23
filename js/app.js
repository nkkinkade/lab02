'use strict';

$(() => {
  const ajaxSettings = { method: 'get', dataType: 'json' };
  $.ajax('./data/page-1.json', ajaxSettings)
    .then((data) => {
      const arrayOfCreatures = data;
      arrayOfCreatures.forEach((creature) => {
        Creature.all.push(new Creature(creature));
      });
    })
    .then(() => {
      renderCreature();
      createOptions();
      handleFilter();
    });
});

function Creature(creature) {
  this.imgUrl = creature.image_url;
  this.getTitle = creature.title;
  this.getDescription = creature.description;
}

Creature.all = [];
Creature.allKeywords = [];

Creature.prototype.render = function () {
  const templateHTML = $('#photo-template').html();
  const renderedHTML = Mustache.render(templateHTML, this);
  return renderedHTML;
};

function renderCreature() {
  Creature.all.forEach(creature => $('#photo-gallery').append(creature.render()));
  $('.photo-template').remove();
}

function createOptions() {
  Creature.allKeywords.sort();
  Creature.allKeywords.forEach(keyword => {
    const $option = $('<option>').text(keyword.charAt(0).toUpperCase() + keyword.slice(1)).attr('value', keyword);
    $('#selector').append($option);
  });
}

function handleFilter() {
  $('#selector').on('change', function() {
    if($(this).val() !== 'default') {
      $('.creature').hide();
      $(`.creature[keyword*="${$(this).val()}"]`).fadeIn();
    } else {
      $('.creature').fadeIn();
    }
  });
}
