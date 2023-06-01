<script lang="ts">
    import type { PageData } from './$types';
    import Section from '$lib/form/Section.svelte';

    import { Icon } from '@steeze-ui/svelte-icon';
	import { Clock, Calendar, MapPin, MusicalNote } from '@steeze-ui/heroicons';
    
    export let data: PageData;

    let {title, image, openingBand, location, date, startTime, endTime} = data;
</script>

<div class="main">
    <div class="line top-line" />
    <h1 class="callout top">{title}</h1>
    <img src={image} alt="Picture for {title} jam session">

    <h1>Details</h1>
    
      <div class="sections">

        <section>
            <div class="line" />
            <Icon src={MusicalNote} theme="solid" class="inline-block w-4 h-4 mr-1" />

        </section>

        <Section title={'Date'} description={'When is the jam taking place?'}>
        <input type="date" name="date" id="date">
        </Section>

        <Section title={'Time'} description={"At what time does the jam session start? This includes the time when the opening band starts."}>
          <input type="time" name="startTime" id="startTime">
          <p>to</p>
          <input type="time" name="endTime" id="endTime">
        </Section>

        <Section title={'Location'} description={"Where is the jam session taking place? If there are some additional directions, place mention those in the description further below."}>
        <input type="text" name="location" id="location">
        </Section>
        
        <Section title={'Opening band'} description={"What group or band is opening the jam? Please us a group name and list the band members in the description further below."}>
          <input type="text" name="band" id="band">
        </Section>

        <Section title="Jam name" description="Please give your event / jam session a name.">
          <input type="text" name="title" id="title">
        </Section>

        <Section title="Description" description={"Please provide an additional details relating to the jam session below."}>
          <textarea name="description" id="description" cols="30" rows="10"></textarea>
        </Section>
        
        <Section title="Picture" description="Upload a picture of banner for the jam session.">
          <input type="file" name="picture" id="picture">
        </Section>
        
        <Section title={"That's it!"} description={"Press the button below to submit the jam session for review. Please make sure it's max 1920 pixels wide or 1080 pixels tall, and preferrably in JPG or WEBP format. If you need to change something, please use something like https://squoosh.app/"}>
        </Section>
      </div>
      <div class="callout bottom">Adding a new jam session</div>
  
    <div class="line bottom-line" />
  </div>

  <style>
    .main {
      position: relative;
  
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
          
          width: 500px;
      padding-right: 2rem;
          margin-top: 3rem;
  
      border-left: 2px solid var(--red);
    }
  
    .description {
      padding-top: 3rem;
      padding-left: 1rem;
      margin: auto;
    }
  
    .callout {
      position: relative;
      z-index: 2;
  
          width: 100%;
      max-width: 88%;
      padding: 1rem;
      margin-left: 1rem;
  
      color: black;
      border-radius: 1rem;
  
      font-size: 2rem;
          font-weight: 900;
          text-align: center;
          line-height: 2rem;
    }
  
    .top {
      position: absolute;
      background: var(--red);
      
      transform: translate(0, -3.5rem);
    }
    
    .bottom {
      background: white;
      
      transform: translate(0, 2rem);
    }
  
    .line {
      position: absolute;
      width: 2rem;
      height: 2px;
      background: var(--red);
    }
  
    .bottom-line {
      left: 0;
      bottom: 0;
    }
  </style>