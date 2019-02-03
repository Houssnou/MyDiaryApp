//decl moment

//to get the value of the Editor
let editorContent;

ClassicEditor
  .create(document.querySelector('#content-input'))
  .then(editor => {
    console.log(editor);
    editorContent = editor;
  })
  .catch(error => {
    console.error(error);
  });
//

//event listener for a click on a
$("#add-entry").on("click", async (event) => {
  //avoid reload page
  event.preventDefault();

  //const content = await getEditorValue();
  //build an object newNote with the input values and auto generate the creation and modification date using moment()
  // $("#content-input").val().trim()
  const newNote = {
    title: $("#title-input").val().trim(),
    content: editorContent.getData(),
    date_creation: moment().format("YYYY-MM-DD HH:mm:ss"),
    last_modification: moment().format("YYYY-MM-DD HH:mm:ss"),
    is_trashed: 0,
    user_id: 1
  };
  console.log(newNote);

   //ajax call
  $.ajax({
    url: "/api/entries",
    method: "POST",
    data: newNote
  }).then(data => {
    //inform the user
    alert("Note Saved Successfully!");
    //page redirection will be handled on the server side
    //then clear form inputs
    //$("#title-input").val("");
    //$("#content-input").val("");
    //reload the page
   // location.reload();
  }); 

});