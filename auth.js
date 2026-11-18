
function showAuthMsg(id,msg,type='error'){const el=document.getElementById(id);if(el){el.className='alert '+type;el.textContent=msg;el.hidden=false}}
function setupRegister(){
 const f=document.getElementById('registerForm');if(!f)return;
 f.addEventListener('submit',e=>{e.preventDefault();const d=Object.fromEntries(new FormData(f));if(!d.name||!d.email||!d.phone||!d.password||!d.confirm)return showAuthMsg('authMsg','Please fill all fields.');if(d.password!==d.confirm)return showAuthMsg('authMsg','Passwords do not match.');
  const users=BB.get(BB.keys.users,[]);if(users.some(u=>u.email.toLowerCase()===d.email.toLowerCase()))return showAuthMsg('authMsg','Email is already registered.');
  const u={id:BB.uid('USR'),name:d.name,email:d.email,phone:d.phone,password:d.password,address:''};users.push(u);BB.set(BB.keys.users,users);BB.set(BB.keys.current,u.id);showAuthMsg('authMsg','Registration successful! Redirecting...','success');setTimeout(()=>location.href='profile.html',500);
 });
}
function setupLogin(){
 const f=document.getElementById('loginForm');if(!f)return;
 f.addEventListener('submit',e=>{e.preventDefault();const d=Object.fromEntries(new FormData(f));if(d.email==='admin@brewandbite.com'&&d.password==='admin123'){sessionStorage.setItem('bb_admin','1');location.href='admin/index.html';return}
  const u=BB.get(BB.keys.users,[]).find(x=>x.email.toLowerCase()===d.email.toLowerCase()&&x.password===d.password);if(!u)return showAuthMsg('authMsg','Invalid email or password.');BB.set(BB.keys.current,u.id);const next=new URLSearchParams(location.search).get('next');location.href=next||'index.html';
 });
}
function setupProfile(){
 const f=document.getElementById('profileForm');if(!f||!BB.requireLogin())return;const u=BB.user();f.name.value=u.name;f.email.value=u.email;f.phone.value=u.phone;f.address.value=u.address||'';
 f.addEventListener('submit',e=>{e.preventDefault();const users=BB.get(BB.keys.users,[]),i=users.findIndex(x=>x.id===u.id);users[i]={...users[i],name:f.name.value.trim(),phone:f.phone.value.trim(),address:f.address.value.trim()};BB.set(BB.keys.users,users);BB.toast('Profile updated');setTimeout(()=>location.reload(),400)});
 document.getElementById('logoutBtn')?.addEventListener('click',()=>{BB.set(BB.keys.current,null);location.href='index.html'});
 document.getElementById('myReservationLink')?.setAttribute('href','my-reservations.html');
}
document.addEventListener('DOMContentLoaded',()=>{setupRegister();setupLogin();setupProfile();});
