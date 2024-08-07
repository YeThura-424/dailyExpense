<template>
  <div class="carouselWrapper relative">
    <div class="flex justify-center gap-x-6 mx-auto">
      <div
        class="main-card min-w-fit"
        ref="sliderCard"
        v-for="(data, index) in carousel"
        :key="index"
      >
        <img
          v-if="data.image"
          :src="data.image"
          alt="image"
          class="w-[130px] h-[90px] object-cover rounded-lg"
        />
        <img
          v-else
          src="/images/user.jpg"
          alt=""
          class="w-[130px] h-[90px] object-cover rounded-lg"
        />
        <div class="pt-4">
          <h3 class="text-base font-normal text-center capitalize">
            {{ data.name }}
          </h3>
        </div>
      </div>
    </div>

    <div class="flex justify-center gap-x-6 mx-auto" v-if="isMultiRow">
      <div
        class="main-card min-w-fit"
        ref="sliderCard"
        v-for="(data, index) in carousel"
        :key="index"
      >
        <img
          v-if="data.image"
          :src="data.image"
          alt="image"
          class="w-[130px] h-[90px] object-cover rounded-lg"
        />
        <img
          v-else
          src="/images/user.jpg"
          alt=""
          class="w-[130px] h-[90px] object-cover rounded-lg"
        />
        <div class="pt-4">
          <h3 class="text-base font-normal text-center capitalize">
            {{ data.name }}
          </h3>
        </div>
      </div>
    </div>
    <div class="slide_button">
      <!-- previous_button  -->
      <button
        class="w-12 h-12 bg-[#FFF8F8] rounded-full flex justify-center items-center absolute top-1/2 -translate-y-1/2"
      >
        <svg
          width="8"
          height="14"
          viewBox="0 0 8 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.73438 1.53125L1.26562 7L6.73438 12.4688"
            stroke="black"
            stroke-width="1.5625"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <!-- next_button  -->
      <button
        class="w-12 h-12 bg-[#FFF8F8] rounded-full flex justify-center items-center absolute top-1/2 -translate-y-1/2 right-0"
      >
        <svg
          width="8"
          height="14"
          viewBox="0 0 8 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.26562 1.53125L6.73438 7L1.26562 12.4688"
            stroke="black"
            stroke-width="1.5625"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  carousel: {
    type: Object,
    required: true,
  },
  itemToShow: {
    type: Number,
    default: 5,
  },
  rows: {
    type: Number,
    default: 2,
  },
});
const carouselData = ref([]);
const sliderCard = ref(null);

// watch(
//   () => props.carousel,
//   (newValue) => {
//     carouselData.value = newValue;
//   },
//   { deep: true }
// );

onMounted(() => {
  carouselData.value = props.carousel;
  startCarousel(sliderCard.value);
});

const startCarousel = (element) => {
  let i;
  for (i = props.itemToShow; i < element.length; i++) {
    element[i].style.display = "none";
  }
};

// const nextSlide = (n) => {
//   let i;
//   const elements = sliderCard.value;
//   const itemToShow = props.itemToShow;
//   const totalItems = elements.length;

//   for (i = 0; i < totalItems; i++) {
//     elements[i].style.transition = "transform 0.5s ease-in-out";
//     elements[i].style.transform = `translateX(-${n * 100}%)`;
//   }

//   setTimeout(() => {
//     for (i = 0; i < totalItems; i++) {
//       elements[i].style.transition = "";
//       elements[i].style.transform = `translateX(0)`;
//     }

//     if (n > 0) {
//       for (i = 0; i < n; i++) {
//         elements[i].style.display = "none";
//       }
//       for (i = totalItems - n; i < totalItems; i++) {
//         elements[i].style.display = "block";
//       }
//     } else {
//       for (i = 0; i < itemToShow + n; i++) {
//         elements[i].style.display = "block";
//       }
//       for (i = itemToShow + n; i < totalItems; i++) {
//         elements[i].style.display = "none";
//       }
//     }
//   }, 500);
// };

const isMultiRow = () => {
  if (carousel.length > itemToShow) {
    if (props.rows > 1) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
</script>
