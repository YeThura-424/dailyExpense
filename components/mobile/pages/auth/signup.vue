<template>
  <div class="login-wrapper px-6 py-4">
    <MobilePageHeader title="Sign Up" text-color="text-black" />
    <div class="login-form-wrapper pt-16">
      <div class="name py-3">
        <CoreInputBox placeholder="Name" type="text" />
      </div>

      <div class="email py-3">
        <CoreInputBox placeholder="Email" type="email" />
      </div>

      <div class="password py-3">
        <CoreInputBox placeholder="password" type="password" />
      </div>

      <div class="checkbox flex gap-x-2">
        <input
          id="termsandcondition"
          type="checkbox"
          class="h-8 w-8 border-2 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
        />
        <label for="termsandcondition" class="text-lg"
          >By signing up, you agree to the
          <span class="text-[#7F3DFF]"
            >Terms of Service and Privacy Policy</span
          >
        </label>
      </div>
      <div class="sign-up py-3">
        <nuxt-link to="/account/add">
          <button
            type="button"
            class="w-full flex items-center justify-center gap-x-2 rounded-md border border-transparent bg-[#7F3DFF] text-white px-4 py-1.5 text-lg font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-pointer"
          >
            <Icon
              name="ion:ios-log-in"
              class="text-white text-2xl cursor-pointer"
            />
            Sign Up
          </button>
        </nuxt-link>
      </div>

      <div class="sign-up-link text-center">
        <p class="text-base text-[#91919F]">
          Already have an account?
          <span class="text-lg text-[#7F3DFF] font-medium">Login</span>
        </p>
      </div>
    </div>
  </div>
</template>
