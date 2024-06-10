<template>
  <div>
    <div class="vertical-centre">
      <img v-if="imagePreview" :src="imagePreview" alt="Image" width="200" />
      <img
        v-else
        src="https://static.thenounproject.com/png/187803-200.png"
        alt="Placeholder Image"
        width="200"
      />
    </div>
    <form @submit.prevent="uploadFile">
      <div class="file-upload">
        <input type="file" id="fileInput" @change="handleFileUpload" />
      </div>
      <button type="submit">Upload</button>
    </form>

    <div v-if="prediction">The predicted value is: {{ prediction }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { api } from '../boot/axios';

// Define reactive references
const items = ref([]);
const selectedFile = ref(null);
const imagePreview = ref(null);
const prediction = ref('');

// Function to fetch data from backend
async function fetchData() {
  try {
    const response = await api.get('/api/mymodels/');
    items.value = response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Handle file selection
function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    imagePreview.value = URL.createObjectURL(file);
  }
}

// Function to upload file to backend
async function uploadFile() {
  if (!selectedFile.value) {
    alert('Please select a file.');
    return;
  }

  const formData = new FormData();
  formData.append('image', selectedFile.value);

  try {
    const response = await api.post('/api/mymodels/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('File upload response:', response.data);
    prediction.value = response.data.predicted_label;
    // Clean up the object URL after uploading
    URL.revokeObjectURL(imagePreview.value);
  } catch (error) {
    console.error('Error uploading file:', error);
    alert('Error uploading file');
  }
}

// Fetch data when the component is mounted
onMounted(fetchData);
</script>
