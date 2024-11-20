<script setup>
import Navbar from '@/components/Navbar.vue';

const oldCode = `    
<rules>
    <rule id="unique-ruleset-id-01000">
        <when>
            <!-- Test a condition... -->
        </when>
        <perform>
            <!-- Perform this action when condition is satisfied -->
        </perform>
        <otherwise>
            <!-- Perform this action when condition is not satisfied -->
        </otherwise>
    </rule>
<rules>
`;
const newCode = `    
<rules>
    <rule id="unique-ruleset-id-01000">
        <when>
            <!-- Test a condition... -->
        </when>
        <perform>
            <!-- Perform this action when condition is satisfied -->
        </perform>
        <ifelse>
            <!-- Perform this if this specific condition -->
        </ifelse>
        <otherwise>
            <!-- Perform this action when condition is not satisfied -->
        </otherwise>
    </rule>
<rules>
`;

</script>

<template>
  <main>
    <Navbar />
    <div class="container mt-5">
      <div class="row align-items-center">
        <!-- Text Content -->
        <div class="col-lg-12 text-center text-center">
          <h1 class="display-5 fw-bold mb-3">Streamline Your Team's Code Collaboration</h1>
          <p class="lead text-muted mb-4 w-50 mx-auto text-center">
            With Code Diff, creating pull requests and conducting thorough code reviews has never been easier. Empower
            your team to work smarter, not harder, with automated workflows, insightful suggestions, and seamless
            collaboration tools designed to enhance your development process.
          </p>
          <div class="d-flex flex-column flex-lg-row gap-3 justify-content-center">
            <a href="/codereviews" class="btn btn-primary btn-lg">Go to Code Reviews</a>
          </div>
          <Diff class="border rounded shadow mt-4" :mode="'split'" :theme="'light'" :language="'xml'"
            :prev="oldCode" :current="newCode" />
        </div>
      </div>
    </div>
  </main>
</template>
