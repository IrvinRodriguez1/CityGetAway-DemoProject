let stars = document.querySelectorAll('.star');
let starComment = document.querySelector('.starComment')
let permanent = starComment.innerText;


const  starText = (rating) =>{
  if(rating === '5-star'){
    return 'Great'
  }else if(rating === '4-star'){
    return 'Good'
  }else if(rating === '3-star'){
    return 'Ok'
  }else if(rating === '2-star'){
    return "Could've been Better"
 }else if(rating === '1-star'){
  return 'Not good'
  }
 }

stars.forEach(element =>{
  element.addEventListener('click', event =>{
    permanent = starText(event.path[1].htmlFor)
  })
  element.addEventListener('mouseover', event =>{
    starComment.innerText= starText(event.path[1].htmlFor);
  })
  element.addEventListener('mouseleave', event =>{
    starComment.innerText = permanent;
  })
})




// not good | could've been better \ ok \ good \ excellent

