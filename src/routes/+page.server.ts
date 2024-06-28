import type { PageServerLoad, Actions } from "./$types";
import { BEAUTY_API } from "$env/static/private";

let task_uuid: string;
// let tryon_type: string;
let user_img_url: string;
let cloth_img_url: string;

let fullBodyImageURL: string;
let clothingImageURL: string;
let fullBodyImageName: string;
let clothingImageName: string;

// Define the actions
export const actions: Actions = {
  tryon: async ({ request }) => {
    const formData = await request.formData();
    fullBodyImageURL = formData.get("fullBodyImageURL") as string;
    clothingImageURL = formData.get("clothingImageURL") as string;
    fullBodyImageName = formData.get("fullBodyImageName") as string;
    clothingImageName = formData.get("clothingImageName") as string;

    if (
      !fullBodyImageURL ||
      !clothingImageURL ||
      !fullBodyImageName ||
      !clothingImageName
    ) {
      return { success: false, message: "All form fields are required." };
    }

    console.log("Full body image URL: ", fullBodyImageURL);
    console.log("Clothing image URL: ", clothingImageURL);
    console.log("Full body image name: ", fullBodyImageName);
    console.log("Clothing image name: ", clothingImageName);

    const data = await createTask(fullBodyImageName, clothingImageName);
    console.log(data);

    if (!data.success){
      return data;
    } else {
      console.log("Uploading full body image");
      const data = await uploadFullBodyImage();
      console.log(data);

      if (!data.success) {
        return data;
      } else {
        console.log("Uploading clothing image");
        const data = await uploadClothingImage();
        console.log(data);

        if (!data.success) {
          return data;
        } else {
          console.log("Submitting task");
          const data = await submitTask();
          console.log(data);

          if (!data.success) {
            return data;
          } else {
            console.log("Getting try on result");
            const data = await getTryOnResult();
            console.log(data);

            return data; 
            // {
            //   success: true,
            //   message: result.data.tryon_img_url,
            // }
          }
        }
      }
    }
  },
  // tryon: async ({ request }) => {
  //   return { success: true , message: "Hello World"};
  // }
};

async function createTask(
  fullBodyImageName: string,
  clothingImageName: string
) {
  const payload = {
    user_img_name: fullBodyImageName,
    cloth_img_name: clothingImageName,
    category: "1",
  };

  const response = await fetch("https://heybeauty.ai/api/create-task", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${BEAUTY_API}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    return {
      success: false,
      error: "Response Failure: Create Try On Request Failed.",
    };
  }

  const data = await response.json();
  const code = data.code;
  if (code != 0) {
    return {
      success: false,
      error: "API Error: " + data.message,
    };
  } else {
    task_uuid = data.data.uuid;
    // tryon_type = data.data.tryon_type;
    user_img_url = data.data.user_img_url;
    cloth_img_url = data.data.cloth_img_url;

    return {
      success: true,
    };
  }
}

async function uploadFullBodyImage() {
  const response = await fetch(user_img_url, {
    method: "PUT",
    headers: {
      "Content-Type": "image/jpeg",
    },
    body: JSON.stringify(fullBodyImageURL),
  });

  if (!response.ok) {
    return {
      success: false,
      error: "Response Failure: Upload Full Body Image Failed.",
    };
  }

  return {
    success: true,
  };
}

async function uploadClothingImage() {
  const response = await fetch(cloth_img_url, {
    method: "PUT",
    headers: {
      "Content-Type": "image/jpeg",
    },
    body: JSON.stringify(clothingImageURL),
  });

  if (!response.ok) {
    return {
      success: false,
      error: "Response Failuer: Upload Clothing Image Failed.",
    };
  }

  return {
    success: true,
  };
}

async function submitTask() {
  const payload = {
    task_uuid: task_uuid,
  };
  const response = await fetch(`https://heybeauty.ai/api/submit-task`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${BEAUTY_API}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    return {
      success: false,
      error: "Response Failure: Submit Task Failed.",
    };
  }

  const data = await response.json();
  if (data.code != 0) {
    return {
      success: false,
      error: "API Error: " + data.message,
    };
  }

  return {
    success: true,
  };
}

async function getTryOnResult() {
  const tryOnResult = async () => {
    const response = await fetch(`https://heybeauty.ai/api/get-task-info`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BEAUTY_API}`,
      },
      body: JSON.stringify(task_uuid),
    });

    if (!response.ok) {
      return {
        success: false,
        error: "Submit Task Failed",
      };
    }

    const data = await response.json();
    if (data.code != 0) {
      return {
        success: false,
        error: "API Error: " + data.message,
      };
    }

    const status = data.data.status;
    //一件黑色毛衣 两个人的回忆

    return {
      success: true,
      status: status,
      data: data.data,
    };
  };

  const result = await tryOnResult();
  let currentStatus = result.status;

  while (currentStatus !== "successed" || currentStatus !== "failed") {
    const result = await tryOnResult();
    currentStatus = result.status;
  }

  if (currentStatus === "successed") {
    return {
      success: true,
      message: result.data.tryon_img_url,
    };
  } else if (currentStatus === "failed") {
    return {
      success: false,
      error: "API Error: " + result.data.err_msg,
    };
  }

  return {
    success: false,
    error: "API Error: " + "Unknown Error",
  };
}

// Define the load function
export const load: PageServerLoad = async () => {
  // Fetch any data required by the page here
  // Return the data as props to the page
  return {};
};
