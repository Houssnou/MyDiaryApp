$(document).ready( () =>{
    //bind all input fieds to our function check
    $(".form-control").bind("keyup", check_field);   
   
    const check_field = () =>{
    const name=$("#new-user-name").val();
    const email=$("#new-user-email").val();
    const password=$("#new-user-password").val();
    const confirmPassword=$("#new-user-confirm-password").val();
    
    if(name!="" && email!="" &&  password!="" &&  confirmPassword!=""){
     $("#signup").button('toggle');
     
     return true;    
   }
  }
});

