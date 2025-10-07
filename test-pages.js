const axios = require('axios');

const baseURL = 'http://localhost:3000';

const pagesToTest = [
  { path: '/', name: 'Home Page' },
  { path: '/about', name: 'About Page' },
  { path: '/programs', name: 'Programs Page' },
  { path: '/admissions', name: 'Admissions Page' },
  { path: '/portal', name: 'Student Portal Page' },
  { path: '/news', name: 'News Page' },
  { path: '/gallery', name: 'Gallery Page' },
  { path: '/testimonials', name: 'Testimonials Page' },
  { path: '/contact', name: 'Contact Page' },
  { path: '/login', name: 'Student Login Page' },
  { path: '/register', name: 'Student Register Page' },
  { path: '/dashboard', name: 'Student Dashboard Page' },
  { path: '/student/classes', name: 'Student Classes Page' },
  { path: '/student/assignments', name: 'Student Assignments Page' },
  { path: '/student/grades', name: 'Student Grades Page' },
  { path: '/student/resources', name: 'Student Resources Page' },
  { path: '/admin', name: 'Admin Login Page' },
  { path: '/admin-dashboard', name: 'Admin Dashboard Page' },
  { path: '/admin/programs', name: 'Admin Programs Page' }
];

async function testPage(path, name) {
  try {
    const response = await axios.get(`${baseURL}${path}`, {
      timeout: 10000,
      validateStatus: function (status) {
        return status >= 200 && status < 400; // Accept 2xx and 3xx status codes
      }
    });
    
    console.log(`✅ ${name} (${path}) - Status: ${response.status}`);
    
    // Check if the page contains expected content
    const content = response.data;
    if (content.includes('E-School') || content.includes('E-Math-Sci')) {
      console.log(`   ✓ Contains school branding`);
    }
    if (content.includes('React')) {
      console.log(`   ✓ React app loaded`);
    }
    if (content.includes('error') || content.includes('Error')) {
      console.log(`   ⚠️  May contain errors`);
    }
    
    return { success: true, status: response.status };
  } catch (error) {
    console.log(`❌ ${name} (${path}) - Error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function testAllPages() {
  console.log('🚀 Testing All E-School Pages...\n');
  console.log('=' .repeat(60));
  
  const results = [];
  
  for (const page of pagesToTest) {
    const result = await testPage(page.path, page.name);
    results.push({ ...page, ...result });
    await new Promise(resolve => setTimeout(resolve, 500)); // Small delay between requests
  }
  
  console.log('\n' + '=' .repeat(60));
  console.log('📊 TEST SUMMARY:');
  
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  console.log(`✅ Successful: ${successful}/${results.length}`);
  console.log(`❌ Failed: ${failed}/${results.length}`);
  
  if (failed > 0) {
    console.log('\n❌ FAILED PAGES:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`   - ${r.name} (${r.path}): ${r.error}`);
    });
  }
  
  console.log('\n🎯 RECOMMENDATIONS:');
  if (successful === results.length) {
    console.log('   🎉 All pages are working perfectly!');
    console.log('   🚀 Ready for deployment!');
  } else {
    console.log('   🔧 Fix the failed pages before deployment');
    console.log('   📝 Check routing configuration');
  }
  
  return results;
}

// Run the tests
testAllPages().catch(console.error);
