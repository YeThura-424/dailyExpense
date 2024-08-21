<template>
  <div class="main-wrapper">
    <div class="p-3 relative">
      <div class="main-header flex justify-between items-center">
        <div class="back_icon" @click="backAction">
          <Icon
            name="ion:arrow-back-circle-sharp"
            class="text-3xl cursor-pointer"
          />
        </div>
        <div class="budget w-full">
          <p class="text-center text-xl font-bold">Budget Detail</p>
        </div>
        <div class="back_icon" @click="deleteAction">
          <Icon name="ion:trash-sharp" class="text-3xl cursor-pointer" />
        </div>
      </div>
    </div>

    <div class="main-info px-4">
      <div class="budget-info flex flex-col items-center">
        <div class="category-wrapper py-4">
          <button
            class="flex w-fit items-center gap-x-3 py-3 px-4 rounded-3xl shadow-md border border-[#E3E5E5] text-base font-medium"
          >
            <svg
              width="33"
              height="32"
              viewBox="0 0 33 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="0.5" width="32" height="32" rx="8" fill="#FCEED4" />
              <path
                d="M23.25 19H9.75H9.435L10.035 22C10.2079 22.847 10.6681 23.6083 11.3378 24.155C12.0075 24.7017 12.8455 25.0002 13.71 25H19.29C20.1545 25.0002 20.9925 24.7017 21.6622 24.155C22.3319 23.6083 22.7921 22.847 22.965 22L23.565 19H23.25ZM15.75 22.75C15.75 22.9489 15.671 23.1397 15.5303 23.2803C15.3897 23.421 15.1989 23.5 15 23.5C14.8011 23.5 14.6103 23.421 14.4697 23.2803C14.329 23.1397 14.25 22.9489 14.25 22.75V21.25C14.25 21.0511 14.329 20.8603 14.4697 20.7197C14.6103 20.579 14.8011 20.5 15 20.5C15.1989 20.5 15.3897 20.579 15.5303 20.7197C15.671 20.8603 15.75 21.0511 15.75 21.25V22.75ZM18.75 22.75C18.75 22.9489 18.671 23.1397 18.5303 23.2803C18.3897 23.421 18.1989 23.5 18 23.5C17.8011 23.5 17.6103 23.421 17.4697 23.2803C17.329 23.1397 17.25 22.9489 17.25 22.75V21.25C17.25 21.0511 17.329 20.8603 17.4697 20.7197C17.6103 20.579 17.8011 20.5 18 20.5C18.1989 20.5 18.3897 20.579 18.5303 20.7197C18.671 20.8603 18.75 21.0511 18.75 21.25V22.75Z"
                fill="#FCAC12"
              />
              <path
                d="M23.25 11.5H21.75V10.75C21.75 10.2575 21.653 9.76991 21.4645 9.31494C21.2761 8.85997 20.9999 8.44657 20.6517 8.09835C20.3034 7.75013 19.89 7.47391 19.4351 7.28545C18.9801 7.097 18.4925 7 18 7H15C14.0054 7 13.0516 7.39509 12.3483 8.09835C11.6451 8.80161 11.25 9.75544 11.25 10.75V11.5H9.75C9.15326 11.5 8.58097 11.7371 8.15901 12.159C7.73705 12.581 7.5 13.1533 7.5 13.75V15.25C7.5 15.8467 7.73705 16.419 8.15901 16.841C8.58097 17.2629 9.15326 17.5 9.75 17.5H23.25C23.8467 17.5 24.419 17.2629 24.841 16.841C25.2629 16.419 25.5 15.8467 25.5 15.25V13.75C25.5 13.1533 25.2629 12.581 24.841 12.159C24.419 11.7371 23.8467 11.5 23.25 11.5ZM12.75 10.75C12.75 10.1533 12.9871 9.58097 13.409 9.15901C13.831 8.73705 14.4033 8.5 15 8.5H18C18.5967 8.5 19.169 8.73705 19.591 9.15901C20.0129 9.58097 20.25 10.1533 20.25 10.75V11.5H12.75V10.75Z"
                fill="#FCAC12"
              />
            </svg>
            Shopping
          </button>
        </div>
        <div class="remaining-wrapper text-center py-4">
          <h1 class="text-xl font-semibold">Remaining</h1>
          <span class="text-6xl font-bold">$0</span>
        </div>
        <div class="budget-progress-bar w-full pt-4 pb-8">
          <div class="budget-bar-wrapper rounded-lg w-full bg-slate-300 flex">
            <div
              class="budget-bar p-2 rounded-lg bg-yellow-500"
              style="width: 60%"
            ></div>
          </div>
        </div>
        <div class="limit-status">
          <button
            class="bg-[#FD3C4A] px-4 py-2 rounded-full flex items-center gap-x-2 text-white font-medium"
          >
            <Icon name="ion:information-circled" class="text-2xl" />
            You have exceed the limit!
          </button>
        </div>
      </div>
      <div class="pb-4 pt-[230px]">
        <button
          type="button"
          class="w-full flex items-center gap-x-2 justify-center rounded-md border border-transparent bg-[#7F3DFF] text-white px-4 py-1.5 text-lg font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-pointer"
        >
          <Icon
            name="ion:arrow-up-left-box-outline"
            class="text-white text-2xl cursor-pointer"
          />
          Edit
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
const router = useRouter();
const route = useRoute();

const backAction = () => {
  router.back();
};

const deleteAction = () => {
  console.log("delete action");
};
</script>
