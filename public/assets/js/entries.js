$(document).ready(function () {
  // on load display all entries from db
  //build the content of our accordion 
  //ajax call 
  // call the API tables

  $.ajax({
      url: "/api/entries",
      method: "GET"
    })
    .then(function (entries) {
      console.log(entries);
      entries.forEach((entry, index) => {
        //accordion is just a card with header and body so lets have fun.
        //lets create an object entryObj that contains all the entry[i] info
        const entryObj = {
          id: entry.id,
          title: entry.title,
          content: entry.content,
          created: moment(entry.date_creation).format("ddd, MMM Do YYYY, h:mm:ss a"),
          updated: moment(entry.last_modification).format("ddd, MMM Do YYYY, h:mm:ss a")
        }
        //build the card
        const $card = $("<card>");

        //the header
        const $cardheader = $(`<div class='card-header text-align' id='heading${index+1}'>`);
        //div row to wrap the line : title dates actions
        //inside the header we will have a row with 3colums 2-8-2
        const $row = $("<div class='row align-items-center'>");
        const $colTitle = $("<div class='col-3 d-flex align-content-start'>");
        const $colDates = $("<div class='col-7 d-flex align-content-start'>");
        const $colActions = $("<div class='col-2 d-flex justify-content-end'>");

        //inline style to be removed later #collapse-link {color: black; font-weight: bold; text-decoration: none;
        //button to make the title clikable
        const $buttonTitle = $(
          `<button class='btn btn-link' type='button' 
                            data-toggle='collapse' data-target='#entry${index+1}'
                            aria-expanded='false' aria-controls='entry${index+1}'
                            style='color: black; font-weight: bold; text-decoration: none'>`
        ).text(entry.title).appendTo($colTitle);

        //build the line //build the line: entry 1 created: modified edit and suppress icon 
        const $spanCreated = $("<span class='mr-2'>").text("Created :").appendTo($colDates);
        const $spanCreatedContent = $("<span style='font-weight: bold'>").text(` ${moment(entry.date_creation).format("ddd, MMM Do YYYY, h:mm a")}`).appendTo($colDates);
        const $spanLastAccess = $("<span class='mx-2'>").text("Last access :").appendTo($colDates);
        const $spanLastAccessContent = $("<span style='font-weight: bold'>").text(`  ${moment(entry.last_modification).format("ddd, MMM Do YYYY, h:mm a")}`).appendTo($colDates);

        //$("<i class='fas fa-edit'>")
        const $update = $("<span class='fas fa-edit text-warning'>").appendTo($colActions);

        const $delete = $("<span class='fas fa-trash-alt text-danger'>").appendTo($colActions);

        //link the data to the button to be able to use it on click on the button
        $update
          .attr("id", "update")
          .attr("data-toggle", "modal")
          .attr("data-target", "#update-modal");

        $delete
          .attr("id", "delete")
          .attr("data-toggle", "modal")
          .attr("data-target", "#delete-modal");

        // Using the data method to append more data 
        $update.data("data-entry", entry);
        $delete.data("data-entry", entry);

        //append them to the 
        //$cardheader.append($buttonTitle, $spanCreated, $spanModified, $update, $delete);
        $row.append($colTitle, $colDates, $colActions);
        $cardheader.append($row);

        //the body
        const $divCollapse = $(
          `<div id='entry${index+1}' aria-labelledby='heading${index+1}' data-parent='#accordion'>`);

        //quick check to determine if it should be a class collapse show or not        
        (index === 0) ? $divCollapse.addClass("collapse show"): $divCollapse.addClass("collapse");

        const $cardBody = $("<div class='card-body' style='background-image: linear-gradient(-90deg, grey, white)'>");

        //adding a div to display the content of the editor
        const $divContent=$("<div style='box-shadow: 2px 2px grey'>").append(entry.content).appendTo($cardBody);
        $cardBody.appendTo($divCollapse);

        //build the card content
        $card.append($cardheader, $divCollapse).appendTo("#accordion");
      });
    });


  //event listener for a click on update   
  $(document).on("click", "#update", function () {
    //get the values back from the data ()
    const updateEntry = $(this).data("data-entry");

    //send data to the modal
    $("#title-modal").val(updateEntry.title);

    //init Classic editor    
    let editorContent;

    ClassicEditor
      .create(document.querySelector('#content-modal'))
      .then(editor => {
        console.log(editor);
        //set the data of the new created editor 
        editor.setData(updateEntry.content);

        editorContent = editor;
      })
      .catch(error => {
        console.error(error);
      });
  

    //confirm-update-modal
    $(document).on("click", "#confirm-update", function (event) {
      //build the update data
      //get the values of the update
      const updateData = {
        id: updateEntry.id,
        title: $("#title-modal").val(),
        content: editorContent.getData(),
        last_modification: moment().format("YYYY-MM-DD HH:mm:ss")
      };

      console.log(updateData);
      //do the ajax call 
      $.ajax({
        url: "/api/entries",
        method: "PUT",
        data: updateData
      }).then(data => {
        //inform the user
        alert("Entry Updated Successfully!");

        //get rid of the modal
        $("#update-modal").modal("dispose");

        //reload the page
        location.reload();
      });
    });
  });
  //event listener for a click on delete
  //a delete is actually not deleting the entry from the journal where the user dont see it  
  $(document).on("click", "#delete", function () {
    //get the values back from the data ()
    const deleteEntry = $(this).data("data-entry");

    console.log(deleteEntry);

    //send the data to the modal
    //confirm delete
    $(document).on("click", "#confirm-delete", function (event) {
      //call ajax /api/delete
      $.ajax({
        url: "/api/entries",
        method: "DELETE",
        data: deleteEntry
      }).then(data => {

        //inform the user
        alert("Entry Successfully deleted!");
        //reload the page
        location.reload();
      });

    });

  });
});