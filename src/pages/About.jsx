import React from 'react'
import { skills } from '../constants'
import CTA from '../components/CTA'

function About() {
  return (
    <section className='max-container'>
      <h1 className='head-text'>Hello, I'm <span className='blue-gradient_text font-semibold drop-shodow'>Raunak</span></h1>
      <div className='mt-5 flex flex-col gap-3 text-slate-500'>
        <p>Front end Developer based in India, specialized in "Front end Development" crafting interactive and user-friendly web applications.</p>
      </div>

      <div className='py-10 flex flex-col'>
        <h3 className='subhead-text'>My Skills</h3>
        <div className='mt-16 flex flex-wrap gap-12'>
          {
            skills.map((skill)=>(
             <div className='block-container w-20 h-20' key={skill.name}>
              <div className='btn-back rounded-xl' />
              <div className='btn-front rounded-xl flex justify-center items-center'>
                <img src={skill.imageUrl} 
                alt={skill.name}
                className='w-1/2 h-1/2 object-contain' />
              </div>
             </div>
            ))
          }
        </div>
      </div>

      {/* <div className='py-12'>
          <h3 className='subhead-text'>Work Experience</h3>
          <div className='mt-5 flex flex-col gap-3 text-slate-500'>
          <p>I'm fresher</p>
          </div>
      </div> */}
          <CTA/>
    </section>
  )
}

export default About