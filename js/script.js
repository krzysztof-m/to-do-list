/*
TO-DO list
User stories:
1. I can add new task
2. I can delete task
3. I can click on done task & it changes tab to "Done"
4. I can check my done tasks & restore some of them to main view
5. I can set priority of task
6. I can delete all tasks in Done tab with one click
7. I can edit tasks
*/
$(document).ready(function() {
  var $todoContainer = $('#to-do-wrapper');
  var $addForm = $('#add-form');
  var $taskInput = $addForm.find('#add-task');
  var $todoList = $('#to-do-list');
  var $doneList = $('#done-list');
  var fadeSpeed = 300;
  
  //add task
  function addItem() {
    if ($taskInput.val()) {
      var $doneBtn = $('<button class="done-item"><i class="fa fa-check"></i></button>');
      var $editBtn = $('<button class="edit-item"><i class="fa fa-pencil"></i></button>');
      var $removeBtn = $('<button class="remove-item"><i class="fa fa-remove"></i></button>');
      var $addedTime = $('<span class="added-time">' + (new Date()).toDateString() + '</span>');
      var $listItem = $('<li><p class="task-text">' + $taskInput.val() +'</p></li>').addClass($choosePriorityBtn.attr('class')).removeClass('choose-priorety').hide();
      $listItem.append($removeBtn,$editBtn,$doneBtn,$addedTime);
      $todoList.append($listItem);
      $listItem.fadeIn(fadeSpeed);
      $taskInput.val("");
    }
  }
  
  $addForm.on('submit',function(e) {
    e.preventDefault();
    addItem();
  });
  
  //remove task
  function removeItem($item) {
    $item.fadeOut(fadeSpeed,function() {
      //alert($(this).height());
      //$(this).nextAll().animate({top: '-=' + $(this).height() + ''},fadeSpeed).css('top','0');
      $(this).remove();
    });
  }
  
  $todoContainer.on('click','.remove-item',function() {
    var $removeItem = $(this).parent();
    removeItem($removeItem);
  });
  
  //move task to Done tab
  function doneItem($item) {
    var $restoreBtn = $('<button class="restore-item"><i class="fa fa-repeat"></i></button>');
    $item.fadeOut(fadeSpeed,function() {
      $item.appendTo($doneList).find('.done-item').replaceWith($restoreBtn).end().show();
    });
  }
  
  $todoContainer.on('click','.done-item',function() {
    var $doneItem = $(this).parent();
    doneItem($doneItem);
  });
  
  //restore item to To Do tab
  function restoreItem($item) {
    var $doneBtn = $('<button class="done-item"><i class="fa fa-check"></i></button>');
    $item.fadeOut(fadeSpeed,function() {
      $item.appendTo($('#to-do-list')).find('.restore-item').replaceWith($doneBtn).end().show();;
    });
  }
  $todoContainer.on('click','.restore-item',function() {
    var $restoreItem = $(this).parent();
    restoreItem($restoreItem);
  });
  
  //edit item
  function editItem($item) {
    var $editWrapper = $('<div class="edit-box" />');
    var $editForm = $('<form><input type="text" id="edit-task" name="edit-task" placeholder="' + $item.clone().find('.added-time').remove().end().text() + '" /><input type="submit" value="Save" /></form>');
    $item.append($editWrapper.append($editForm));
    $editForm.on('submit',function(e) {
      e.preventDefault();
      $item.find('.task-text').text($editForm.find('#edit-task').val());
      $editForm.remove();
    })
  }
  
  $todoContainer.on('click','.edit-item',function() {
    var $editItem = $(this).parent();
    editItem($editItem);
  });
  
  // tabs
  var $tabsContainer = $('#tabs');
  var $tabs = $tabsContainer.find('.tab');
  var $tabsContent = $('[id$="tab-content"]');
  $tabsContent.not(':first').hide();
  $tabs.on('click',function(e) {
    e.preventDefault();
    $tabs.removeClass('active').filter($(this)).addClass('active');
    var href = $(this).attr('href');
    $(href).show();
    $tabsContent.not($(href)).hide();
  });
  
  
  //priorities btn - change task priority by setting it's color
  var $prioritiesContainer = $('.priorities');
  var $prioritiesList = $prioritiesContainer.find('.priorities-list');
  var $choosePriorityBtn = $prioritiesContainer.find('.choose-priorety');
  var $prioritiesBtns = $prioritiesContainer.find('.priority button');
  
  $choosePriorityBtn.on('click',function() {
    $prioritiesList.toggle();
  });
  $prioritiesBtns.on('click',function(e) {
    e.preventDefault();
    $choosePriorityBtn.removeClass('low medium high').addClass($(this).attr('class'));
    $prioritiesList.hide();
  });
  
    
  //delete all tasks from Done tab
  $('#delete-all').on('click',function() {
    $doneList.children().fadeOut(function() {
      $(this).remove();
    });
  });
});