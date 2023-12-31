import { useState,useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import {preview} from "../assets";
import {getRandomPrompt} from "../utils/index";
import FormField from "../components/FormField";
import Loader from "../components/Loader";
const CreatePost = () => {
  const navigate = useNavigate();
  const [form,setForm] = useState({
    name:'',
    prompt:'',
    photo:''
  });
  const [generatingImg,setGeneratingImg] = useState(false);
  const [loading,SetLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      SetLoading(true);
      try {
        const response = await fetch('https://imagegenerator1.onrender.com/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form }),
        });
        console.log(form);
        await response.json();
        alert('Success');
        navigate('/');
      } catch (err) {
        alert(err);
      } finally {
        SetLoading(false);
      }
    } else {
      alert('Please generate an image with proper details');
    }
  };


 const handleChange = (e)=>{
  setForm({...form,[e.target.name]:e.target.value})


 }
 const handleSurpriseMe = ()=>{
  const randomPrompt =getRandomPrompt(form.prompt);
  setForm({...form,prompt:randomPrompt});  

 }
 const generateImage = async () => {
  if (!form.prompt) {
    alert('Please provide a proper prompt');
    return;
  }

  try {
    setGeneratingImg(true);

    const response = await fetch('https://imagegenerator1.onrender.com/api/v1/dalle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: form.prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
  } catch (err) {
    alert('An error occurred while generating the image. Please try again later.');
    console.error(err);
  } finally {
    setGeneratingImg(false);
  }
};

  return (
    <section className="max-w-7xl mx-auto">
       <div>
         <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">Generate an imaginative image through DALL-E AI and share it with the community</p>
       </div>

       <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Ex., john doe"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className='relative bg-grey-50 border 
          border-grey-300 text-grey-900 text-sm
          rounded-lg focus:ring-blue-500 focus:border-blue-500
          w-64 p-3 h-64 justify-center items-center'>
            {form.photo?(
              <img src={form.photo} 
                   alt={form.prompt}
                   className='w-full h-full object-contain'
                    />
            ):(
              <img
              src={preview}
              alt="preview"
              className='w-9/12 h-9/12 object-contain
              opacity-40'
              />
            )}
            {generatingImg && (
              <div className='absolute inset-0 z-0
              flex justify-center items-center 
              bg-[rgba(0,0,0,0.5)] rounded-lg'>
                <Loader/>
              </div>
            )}
          </div>
          </div>

          <div className='mt-5 gap-5 flex'>
            <button
            type = "button"
            onClick={generateImage}
            className='text-white bg-green-700
            font-medium rounded-md text-sm w-full
            sm:w-auto px-5 py-2.5 text-center'
            >
              {generatingImg ? "Generating...":'Generate'}
            </button>
          </div>
          <div className='mt-10'>
            <p className='mt-2 text-[#666e75] text-[14px]'>
              Once you have created the image you want,you can share
              it with others in the community
            </p>
            <button 
            onClick={handleSubmit}
            type="submit"
            className='
            mt-3 text-white bg-[#6469ff]
            font-medium rounded-md text-sm w-full
            sm:w-auto px-5 py-2.5 text-center'>
              {loading ?'Sharing..':'Share with the community'}
            </button>
          </div>
          </form>
       </section>
  )
}

export default CreatePost
