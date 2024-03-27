# Customer Service Simulation Game

## Abstract

The "Customer Service Game" is a simulation game designed to highlight the importance of prompt engineering in customer service and training. Split into two parts, the game first immerses participants in the role of customer service representatives, dealing with complaints using generated consumer personas and company profiles. In the second part, participants elevate to customer service trainers, refining and evaluating response strategies through iterative feedback. 

This game emphasizes the use of precise prompts to enhance communication effectiveness, teaching players to apply prompt engineering for improved customer interactions and training methodologies. Through engaging in both customer-facing and training roles, participants gain a comprehensive understanding of crafting empathetic, strategic responses, showcasing the pivotal role of prompt engineering in modern customer service practices.

The game is intended for web implementation to automate the workflow and enrich student experiences.

## Part 1. Customer Service

1. Grouping
    1. Each student interact with the web independently.
2. Generate Company Information
    1. GPT will generate detailed information about a fictional tech company, including its name, founding year, main products, target market, and recent market challenges.
    2. **Prompt**: "Generate detailed information about a fictional tech company, including its name, founding year, main products, target market, and recent market challenges."
    3. Enhanced Prompt: "Create a comprehensive profile for a fictional technology company, detailing its unique name, the year it was founded, the range of its flagship products, and the specific demographics it aims to serve. This narrative should paint a vivid picture of the company’s journey, its core innovations, the competitive landscape it navigates, and how it adapts to the evolving demands and obstacles in the technology sector.”
3. Generate Consumer Persona
    1. GPT will create a detailed consumer persona, including age, gender, occupation, interests, purchasing motives, and common complaints about tech products.
    2. **Prompt**: "Create a detailed consumer persona for a tech product market, including age, gender, occupation, interests, purchasing motives."
4. Decide a target product
    1. GPT will generate detailed information regarding a virtual product produced by the company that was purchased by the customer. This product will later be the complained product.
    2. **Prompt**: "Based on the previously generated company information, generate detailed information about a virtual product produced by this company, including the product name, features, intended user base, and any known issues. This product will be the focus of the customer's complaint."
5. Simulate a Complaint
    1. Based on the generated company, persona and product information GPT will simulate a specific complaint from the persona about the tech company, detailing the product issue.
    2. **Prompt**: "Simulate a specific complaint from the generated consumer persona regarding the virtual product, including detailed description of the issue, how it affects the user, and the persona's expectations from the company."
6. Player Response
    1. Students (Players) will have to respond to the complaint. This stage does not require our participation, but we can offer guidance on crafting effective responses based on the situation.
    2. This stage is interactive and requires students to respond based on the complaint generated. Provide guidelines for crafting effective responses, emphasizing empathy, understanding the customer's viewpoint, and proposing a practical solution.
7. Scoring
    1. Based on the persona's expectations and the specific content of the complaint, GPT will rate the player's response on a scale from 0 to 5, and explain the reasoning behind the score.
    2. **Prompt**: "Evaluate the player's response to the customer complaint on a scale of 0 to 5 with one floating point, considering the persona's expectations, the specificity of the issue addressed, and the effectiveness of the proposed solution. Provide feedback and reasoning behind the score."

## Part 2. Customer Service Trainer

1. Grouping
    - Students form groups of 2 people, each taking on the role of "Customer Service Trainers/Instructors."
2. Presenting the Persona
    1. A detailed consumer persona is generated and presented to the players, showcasing specific characteristics such as age, gender, occupation, interests, and common complaints.
    2. **Prompt**: "Generate a detailed consumer persona for a tech product market, including age, gender, occupation, interests, purchasing motives, and common complaints about tech products."
3. Inputting Response Guidelines
    1. Players, acting as trainers, draft guidelines for customer service representatives on how to respond to complaints effectively, and then input their proposed guidelines for customer service representatives to follow when responding to complaints.
4. Generating Responses
    1. Based on the trainers’ guidelines, a response to a complaint from the persona is generated, addressing a specific issue with a tech company's product.
    2. **Prompt**: "Given these guidelines provided by the customer service trainers: [Insert Guidelines Here], generate a response to a specific complaint from the persona about a tech company's product, detailing the product issue."
5. Scoring and Feedback
    1. Players score the generated response on a scale from 0 to 5, providing explanations for their scores and suggestions for improvement.
    2. Players evaluate the generated response on a scale from 0 to 5, provide an explanation for their score, and offer suggestions for improvement.
6. Iterative Improvement
    1. Steps 3 and 4 are repeated five times, with each round incorporating feedback and adjustments from the previous one to refine the response strategy. Each time, students adjust the prompt to incorporate the feedback and suggestions from the previous round to refine the response strategy.
7. Final Response: A final response is crafted, summarizing the historical guidelines and feedback provided throughout the game.
    1. **Prompt**: "Based on the historical records of guidelines and feedback provided by the customer service trainers, generate a final response to the consumer's complaint."
8. Evaluation: The effectiveness of the final response is evaluated based on the persona’s expectations, and a score is assigned on a scale from 0 to 5 by GPT.
    1. **Prompt**: "Evaluate the effectiveness of the final response based on the detailed consumer persona's expectations and the specific content of the complaint. Rate the response on a scale from 0 to 5, providing reasoning behind the score."

### Tips

- Encourage Detailed Guidelines: Urge players to provide detailed and specific guidelines for responses, focusing on empathy, problem-solving, and clear communication.
- Focus on Constructive Feedback: Emphasize the importance of constructive feedback and actionable suggestions to improve the learning experience.
- Reflect on Improvement: After each round, encourage groups to discuss how the feedback influenced the response quality, promoting understanding of effective communication strategies.
- Analyze GPT's Final Evaluation: Use GPT's final evaluation to discuss with students the importance of tailoring customer service strategies to meet specific consumer needs and how prompt engineering can facilitate this process.