<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
  import { Clock, Calendar, MapPin, MusicalNote } from '@steeze-ui/heroicons';

	let image: string;
	let title: string;
	let date: string;
	let time: string;
	let location: string;
	let opener: string;

  let color: string;

</script>

<div class="rounded-lg max-h-100">
	<img class="h-60%" src={image} alt="Picture of jam at {location}" />\
	<h1 class="text-2xl font-bold">{title}</h1>
	<div class="p-4 flex">
		<div class="w-1/2">
      <h2 class="text-sm text-[#CACACA] font-regular mb-2">
            <Icon src={MapPin} theme="solid" class="inline-block w-4 h-4" />
            {location}</h2>
      <h2 class="text-sm text-[#CACACA] font-regular">
            <Icon src={Calendar} theme="solid" class="inline-block w-4 h-4" />
            {date}</h2>
    </div>
		<div class="w-1/2">
      <h2 class="text-sm text-[#CACACA] font-regular mb-2">
            <Icon src={MusicalNote} theme="solid" class="inline-block w-4 h-4" />
            {opener}</h2>
      <h2 class="text-sm text-[#CACACA] font-regular">
            <Icon src={Clock} theme="solid" class="inline-block w-4 h-4" />
            {time}</h2>
    </div>
	</div>
</div>
