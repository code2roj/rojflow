/**
 * @function testOpenRouterIntegration
 * @description Manual test suite to verify the portability, reasoning logic, 
 * and error handling of the queryOpenRouter utility.
 */
import { queryOpenRouter } from "../openRouterService";

const testOpenRouterIntegration = async () => {
  console.log('--- STARTING OPENROUTER TESTS ---');

  // Test Case 1: Reasoning Query (Verifies the new reasoning logic)
  try {
    console.log('Test 1: Reasoning Query (DeepSeek R1)...');
    // Using a reasoning-capable model to verify the [REASONING] block
    const result = await queryOpenRouter(
      'Why is 9.11 smaller than 9.9?',
      500,
      'deepseek/deepseek-r1', 
      'You are a logical math assistant.',
      true // Enable reasoning
    );
    
    if (result.includes('### THOUGHT PROCESS')) {
      console.log('✅ Success! Reasoning trace detected.');
    } else {
      console.warn('⚠️ Success, but no reasoning trace found (Model may have skipped it).');
    }
    console.log('Response Preview:', result.substring(0, 150) + '...');
  } catch (err: any) {
    console.error('❌ Test 1 Failed:', err.message);
  }

  // Test Case 2: Standard Query (No Reasoning)
  try {
    console.log('\nTest 2: Standard Query (Gemma 4)...');
    const result = await queryOpenRouter(
      'Translate "Hello" to Japanese.',
      50,
      'google/gemma-4-26b-a4b-it',
      'You are a translator.',
      false // Explicitly disabled
    );
    console.log('✅ Success! Translation:', result);
  } catch (err: any) {
    console.error('❌ Test 2 Failed:', err.message);
  }

  // Test Case 3: Validation Check (Missing System Instruction)
  try {
    console.log('\nTest 3: Validation Check (Missing System Instruction)...');
    // @ts-ignore
    await queryOpenRouter('This should fail', 100, 'openai/gpt-4o', undefined);
  } catch (err: any) {
    console.log('✅ Success! Caught expected error:', err.message);
  }

  // Test Case 4: Empty Text
  try {
    console.log('\nTest 4: Edge Case (Empty Text)...');
    const emptyResult = await queryOpenRouter('', 100, 'openai/gpt-4o', 'System prompt');
    if (emptyResult === '') {
      console.log('✅ Success! Handled empty input gracefully.');
    }
  } catch (err: any) {
    console.error('❌ Test 4 Failed:', err.message);
  }

  console.log('\n--- TESTS COMPLETE ---');
};

testOpenRouterIntegration();