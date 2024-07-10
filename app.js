 
 // NOTE POINT

//1.getFirestore initialize the db in your project  const db = getFirebstore(app)

 // 2. collection--> to make collection referrnce --> collection(db,"users")
 // 3. doc-->to make document refrence-->doc(db,"user","---id---")
 // 4. addDoc--> to add document to the collection and generate uinque itself--> addDoc(db,"users",{your data is here})

 //5. getDocs -->to get all documents in the collection --> getDocs(collection(db,"users"))

 // 6. deleteDoc--> to delete a single document under collection -->
  // deleteDoc(doc(db,"users",'---id---'))

  // 7. setDoc --> to add/update document under the collecton ---> setDoc(doc(),{})

  // 8. getDoc --> to get a single document from collection --> getDoc(doc())
  
    

    // Import the functions you need from the SDKs you need
    import { initializeApp,getApp  } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";

    // firebase firestore
    import { getFirestore ,collection, addDoc,getDocs ,query, where
  
  
    } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
  
  
     /// fire storage paart
  
     import { getStorage ,ref ,uploadBytes ,uploadBytesResumable, getDownloadURL,listAll ,deleteObject 
  
  
      } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-storage.js";
  
  
      // fire base auth
    import {getAuth ,
       createUserWithEmailAndPassword,
       onAuthStateChanged ,
       signInWithEmailAndPassword ,
       signOut ,GoogleAuthProvider,getRedirectResult 
  
  
    } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
  
    // Your web app's Firebase configuration
    // const firebaseConfig = {
    //   apiKey: "AIzaSyAtlby0Myb4XRtKHtX0EllJsNRSoWZ6Svo",
    //   authDomain: "store-data-ba338.firebaseapp.com",
    //   projectId: "store-data-ba338",
    //   storageBucket: "store-data-ba338.appspot.com",
    //   messagingSenderId: "743729553629",
    //   appId: "1:743729553629:web:59507db6aa0334ac9dbb34"
    // };
  
    const firebaseConfig = {
      apiKey: "AIzaSyAtlby0Myb4XRtKHtX0EllJsNRSoWZ6Svo",
      authDomain: "store-data-ba338.firebaseapp.com",
      projectId: "store-data-ba338",
      storageBucket: "store-data-ba338.appspot.com",
      messagingSenderId: "743729553629",
      appId: "1:743729553629:web:59507db6aa0334ac9dbb34"
    };
  
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    const storage = getStorage(app);
    const provider = new GoogleAuthProvider();
    auth.languageCode = 'it';
    
    // console.log(storage,"i sm storage part")
  
  
  
  
  
  
  
  
    // create account
  
    const userName =document.getElementById("userName")
    const email =document.getElementById("exampleInputEmail1")
    const password =document.getElementById("exampleInputPassword1")
    const sumbitBtn =document.getElementById("sumbitBtn")
    const signup_container =document.getElementById("signup_container")
    var userDataObj ;
    var uid;
  
  
    // login page variable
  
  
    const loginBtn =document.getElementById("loginBtn")
    const emailLogin =document.getElementById("exampleInputEmail2")
    const passwordLogin =document.getElementById("exampleInputPassword2")
    const login_container =document.getElementById("login_container")
  //   const loginBtn =document.getElementById("loginBtn")
  
   
    // blog container
  
    const blog_container =document.getElementById("blog_container")
    const logoutBtn =document.getElementById("logoutBtn")
    const topic =document.getElementById("topic")
    const description =document.getElementById("description")
    const showEmail =document.getElementById("showEmail")
    const addBlog =document.getElementById("addBlog")
    const filterBtn =document.getElementById("filterBtn")
    const filterCard =document.getElementById("filterCard")
  
   const level =document.getElementsByName("level")
   const queryOption =document.getElementsByName("query")
  
  
    const photoBtn =document.getElementById("photoBtn")
    const photo =document.getElementById("photo")
    const img =document.getElementById("img")
    const listAllBtn =document.getElementById("listAll")
    const deleteImg =document.getElementById("deleteImg")
    
  
  
    
  
    // THIS IS PERFECT CODE OF IMAGE UPLOAD OF EVERY KIND OF IMAGES TYPES
    photo.addEventListener("change",(e)=>{
  
      // const imageRef = ref(storage, 'photopic.jpg');
  
  //     const storageRef = ref(storage, 'newPic/images');
  
  // // 'file' comes from the Blob or File API
  // uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
  //   console.log('Uploaded a blob or file!',e.target.files[0].name);
  // });
  
  //  img.src =URL.crateObjectURL(e.target.files[0].name)
  //  console.log("photo",e.target.files[0].name)
  
  
  
      // Create the file metadata
  /** @type {any} */
  const metadata = {
    contentType: 'image/jpg'
  };
  
  // Upload file and metadata to the object 'images/mountains.jpg'
  const storageRef = ref(storage, 'oldpic/' + e.target.files[0].name);
  const uploadTask = uploadBytesResumable(storageRef, e.target.files[0], metadata);
  
  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on('state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          console.log("User doesn't have permission to access the object")
          break;
        case 'storage/canceled':
          // User canceled the upload
          console.log("User canceled the upload")
          break;
  
        // ...
  
        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          console.log("Unknown error occurred, inspect error.serverResponse")
          break;
      }
    }, 
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        img.setAttribute('src', downloadURL );
  
      });
    }
  )
  
  }) 
  
    // list all the file of uploaded images
  
    listAllBtn.addEventListener("click",()=>{
  
  
        // Create a reference under which you want to list
  const listRef = ref(storage, `gs://store-data-ba338.appspot.com/oldpic/`);
  
  // Find all the prefixes and items.
  listAll(listRef)
    .then((res) => {
      res.prefixes.forEach((folderRef) => {
        // All the prefixes under listRef.
        // You may call listAll() recursively on them.
        console.log(folderRef,"folderRef")
      });
      res.items.forEach((itemRef) => {
        // All the items under listRef.
        console.log("All the items under listRef.",itemRef._location.path)
      });
    }).catch((error) => {
      // Uh-oh, an error occurred!
      console.log("Uh-oh, an error occurred!",error)
    });
  
    })
  
  
    // delete image  button 
  
    deleteImg.addEventListener("click",()=>{
  
  
      // Create a reference to the file to delete
  const desertRef = ref(storage, `newPic/`);
  
  // Delete the file
    deleteObject(desertRef).then((p) => {
    // File deleted successfully
    console.log("File deleted successfully",p)
      }).catch((error) => {
    // Uh-oh, an error occurred!
    console.log("Uh-oh, an error occurred!",error)
      });
  
    })
    
  
    
   
  
  
  
     /// create account function
    sumbitBtn.addEventListener("click",(e)=>{
      e.preventDefault()
  
      //   console.log(userName.value ,email.value,password.value)
        if(!email.value ||!password.value) return Swal.fire("please enter email and password");
  
  
          createUserWithEmailAndPassword(auth, email.value, password.value)
       .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      // console.log(user.uid,email.value,password.value)
       uid =user.uid
       userDataObj ={
          userName:userName.value,
          email:email.value,
          password:password.value,
          userid:user.uid,
          type:"single",
          time:new Date().toLocaleString()
      }
       addDataInDb(userDataObj)
  
  
          userName.value =''
          email.value =''
          password.value =''
      Swal.fire({
          title: "Email!",
          text: "You created successfull email and password!",
          icon: "success"
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Swal.fire(errorCode);
  
  
      // ..
    });
    })
  
    // add data of user in database
      async function addDataInDb(userDataObj){
  
      console.log(userDataObj,"user object aay akya ")
      try {
          const docRef = await addDoc(collection(db, "usersObj"),userDataObj);
          console.log("Document written with ID in the dataBase: ", docRef.id);
          Swal.fire("user data save in data base");
  
        } catch (e) {
          console.error("Error adding document: ", e);
        }
    }
  
    // auth change state of function
  
     
    function stateChange(){
  
  
      onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const uid = user.uid;
  
            signup_container.style.display ="none"
              login_container.style.display ="none"
              blog_container.style.display ="block"
              blogShowCard.style.display ="block"
              showEmail.innerHTML =user.email;
              getBlogData(uid,user)
              // console.log(user.email, user.uid,'user hu me')
  
  
  
            // ...
          } else {
              signup_container.style.display ="block"
              login_container.style.display ="none"
              blogShowCard.style.display ="none"
              blog_container.style.display ="none"
  
            // User is signed out
            // ...
          }
        });
    }
  
    stateChange()
  
  
  
     /// logout function 
  
     logoutBtn.addEventListener("click",()=>{
  
      signOut(auth).then(() => {
          // Sign-out successful.
          Swal.fire("you are logout successfull");
          login_container.style.display="block";
          signup_container.style.display ="none";
          blog_container.style.display ="none";
  
        }).catch((error) => {
          // An error happened.
          Swal.fir(error);
          console.log(error,"logout error")
  
        });
  
     })
  
  
  
  
  
  
  
     // Blog container function with blog data in firebase firestore me
  
  
     //  
  
     const blogShowCard =document.getElementById("blogShowCard")
      
     addBlog.addEventListener("click",()=>{
  
      console.log(uid,"i am uid ")
      
      level.forEach(async(data)=>{
        if(data.checked){
          console.log(data.value )
  
          
      const blogCollection  =collection(db,"blogData")
  
      try {
        const blogdocRef = await addDoc(blogCollection , {
          topic:topic.value,
          description:description.value,
          time:new Date().toTimeString().slice(0,9),
          level:data.value,
          
        
        });
          getBlogData()
        console.log("blog collection  written with ID: ", blogdocRef.id);
      } catch (e) {
        console.error("Error adding document of blog data in firestore: ", e);
      }
  
  
  
  
  
  
        }
       })
  
      
  
  
      
  
        topic.value ='';
        description.value =''
     })
  
  
      // get blog data card from firestore 
  
     async function getBlogData(uid,user){
  
        // console.log(uid,' i am uid of current eamil',user.email)
  
       try {
  
        const querySnapshot = await getDocs(collection(db, "blogData"));
        querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data()}`);
        // console.log(doc.data(),"get data from db")
      
      
      
      
          
        let card = `
        <div class="bg-slate-300 m-1  w-[70%] mx-auto shadow-lg rounded-md p-2 my-4">
          
            
            <span class="bg-green-300  p-1 rounded-lg">${doc.data().level}</span>
      
            <h1 class="font-medium m-1 p-1">${doc.data().topic} </h1>
            <h4 class="font-medium p-1 ">${doc.data().description}</h4>
      
          <span> ${doc.data().time}</span>
          <span> ${doc.data().userid}</span>
          
      
          </div> `
      
          blogShowCard.innerHTML += card
      
      
      
          });
        
       } catch (error) {
        console.log("get back data error ",error)
        
       }
        
      }
  
  
      filterBtn.addEventListener("click",()=>{
  
        // console.log(queryOption,'qeuery value')
  
        
  
        
        queryOption.forEach(async(data)=>{
          if(data.checked){
            console.log(data.checked,"kya checked aaya",data.value)
  
            if(data.value==="all"){
               getBlogData()
            }
  
            
              try {
  
        const q = query(collection(db, "blogData"), where("level", "==",`${data.value}`));
  
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
  
          blogShowCard.innerHTML =''
        filterCard.innerHTML =''
  
        let card = `
        <div class="bg-violet-500 m-1  w-[70%] mx-auto shadow-lg rounded-md p-2 my-4" id="${doc.id}">
          
            
            <span class="bg-green-300  p-1 rounded-lg">${doc.data().level}</span>
      
            <h1 class="font-medium m-1 p-1">${doc.data().topic} </h1>
            <h4 class="font-medium p-1 ">${doc.data().description}</h4>
      
          <span> ${doc.data().time}</span>
          
      
          </div> `
      
          filterCard.innerHTML += card
      
        
  
        });
  
        
      } catch (error) {
        console.log("error in qeuery point",error)
      }
  
  
          }
        })
  
      
  
       
  
      })
  
   var googleBtn =document.getElementById("googleBtn")
   googleBtn.addEventListener("click",googleSignUp)
  
      function googleSignUp(){
  
        getRedirectResult(auth)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
  
      // The signed-in user info.
      const user = result.user;
      console.log(user,"user value")
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      console.log(errorCode,errorMessage,"errro in google signup")
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  
      }
       
  
  
      