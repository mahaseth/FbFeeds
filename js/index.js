
//let fbToken='EAACEdEose0cBAAAseQ5pNGs9TPkTOmALlM4RpCby9F6691pDYMNSyK0XzOmY74BFJAIyxJQ9zNdbfAVzq6KZBSdureSMdSvKZAkZAEKCdhMWBiXOCFL4JcMGjlZBZCKmEkR2Wfjhld1cf5aqSe5Nst8gpqokm7NeDc9vSnDoW500oCyBBoZC0YiZBt7R8TxZCk079qG2uAno9QZDZD';

 
$(document).ready(() => {
   $("#facebookBtn").click(()=>{
   	 let token=$("#tokenText").val();
   	  if(token!=undefined || token!="")
   {  
   	 $(".mainpage").css("display","none");
   	 $(".homepage").css("display","block");
   	 showprofile(token);
   }
   else{
   	alert("insert correct token");
   }
   });
  
  
		
		

		$(".postpage").click(()=>{
              $(".postcard").css("display","block");
              $(".abtme").css("display","none");
	});


     $(".aboutme").click(()=>{
     	 $(".postcard").css("display","none");
     	 $(".abtme").css("display","block");
     });


      });

    $("#logout").click(()=>{
    	token=null;
    	 $(".mainpage").css("display","block");
   	 $(".homepage").css("display","none");
    });

let showprofile=(token)=>{
		
		   
			$.ajax(
			{	type:"get",
			   


				url: 'https://graph.facebook.com/me?fields=id,name,about,quotes,birthday,picture,education,cover,address,email,posts{created_time,type,full_picture,story,message,source,likes,comments,shares,actions},first_name,favorite_athletes,gender,hometown&access_token='+token,
				

				success:(response)=>{
					console.log(response);
					let username=response.name;
					let quotes=response.name;
					let cover=response.cover.source;
					let prof=response.picture.data.url;
					let email=response.email;
					let gender=response.gender;
					let quotess=response.quotes;
					let bDate=response.birthday;
					let post= response.posts.data;

                   
					console.log(cover);
                 //profile pic
					if(prof != undefined && prof!= null )
						 $(".profile").attr("src",""+prof+"");

				    if(cover != undefined && cover!= null )
						 $(".cover").attr("src",""+cover+"");



						if(email != undefined && email != null )
						 $(".email").text(email);


                   if(username != undefined && username != null )
						 $(".name").text(username);


				   if(gender != undefined && gender != null )
						 $(".gender").text(gender);


					 if(quotess != undefined && quotess != null )
						 $(".quotes").text(quotess);


					if(bDate != undefined && bDate != null )
						 $(".birthday").text(bDate);
					let n=post.length;
					console.log(n);


               

				  for(let p of post)	
				   { 
                      let content;

				   	  if(p.type == "photo"){
                            content = "<img src='" + p.full_picture + "'" +" class='img-responsive' alt='Smiley face' height='250vh' width='400vw' border=1px >";    
                        }
                        else if (p.type == "video"){
                            content = "<video controls src=" + "" + p.source + " " + "type= " + "video/mp4" + " height='250vh' width='400vw'></video>";          
                        }
                        else if (p.type == "link"){
                           content = "<a href='" + p.full_picture + "'> Visit this Post Here</a>" ;   
                        }                            
                        else if (p.type == "status"){
                            content = "<h6> Updated status </h5>";
                        } 
 
                  

                    { $(".post").append(`<div class="card postcard"> 
                     	                   <div class="card-header" style="background-color:#488c48" >${p.message}</div>
                     	                    <div class="card-body"> <p  style="text-align: center;">${content}</p>
                     	                    </div>
                     	                    <div class="class-header" style="text-align: center;"><small class="card-title">created at: ${p.created_time}
                     	                    </small></div>
                     	`);

				   	 }

				   	
				   } 





				},
				error:(data)=>{
					 alert("tokenerror");

				},  
				timeout: 5000, // keeping the timeout for 5 sec 
                beforeSend: () => { //Displaying loader
			    $('#getCount').text("Loading...");
			    $('#loaderPosts').delay(1000).show();

                },
			   complete:()=>{
			   	console.log("data fetched successfully");
			   }
			});//end of ajax
		}
 