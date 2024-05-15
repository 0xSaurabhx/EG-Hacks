# Codegram - Modernizing Legacy Code

## Overview

Codegram is an advanced legacy code converter designed to transform VB, Delphi, and COBOL code into modern languages such as Java, C#, and Python. Our solution ensures lightning-fast conversion while maintaining code efficiency and readability. Codegram also provides integrated tools for debugging, code optimization, and code explanation to enhance the development experience.

## Features

- **Lightning-fast Conversion**: Converts large legacy code files to modern languages within milliseconds using advanced algorithms.
- **Efficiency without Sacrifice**: Ensures converted code is efficient, readable, and adheres to modern coding standards.
- **Integrated Debugging Tools**: Seamless error identification and correction in converted code.
- **Code Optimization**: Analyzes and improves converted code for enhanced performance and efficiency.
- **Documentation Generator**: Generates structured documentation templates to enhance code comprehension.
- **Code Explainer**: Transforms complex code into easy-to-understand explanations.
- **Code Debugger**: Efficiently identifies and resolves code issues.
- **Email Verification**: Ensures user data security by authenticating email addresses.
- **Conversion History**: Stores conversion input data for future reference.

## Technology Stack

### Frontend
- **React & Vite**: React provides optimized builds, while Vite offers a plugin-like architecture and ECMAScript support.

### Backend
- **Python**: Chosen for its extensive use in AI programs and modules, supported by a vast community.

### AI Model
- **Mistral 8x7b**: Selected as the most capable open-source Large Language Model (LLM) according to our assessments.

### Database
- **PostgreSQL**: Selected for its scalability and low latency.

### Storage
- **Cloudflare R2**: Used for storing converted code and file conversion history.

  # README

## AI Innovation Challenge: What We Built

### Overview
In the AI Innovation Challenge, we developed a suite of tools aimed at enhancing the coding and software development process. These tools leverage advanced AI techniques to assist developers in various aspects of their work, from understanding and debugging code to generating comprehensive documentation.

### Tools Developed

1. **Conversion History**
   - **Description**: This tool keeps a log of all conversion input data, allowing developers to track and review their conversion activities.
   - **Features**:
     - Stores conversion input data with timestamps.
     - Provides an easy-to-navigate history of past conversions.
     - Facilitates tracking and auditing of data transformations.

2. **Documentation Generator**
   - **Description**: Automatically generates structured documentation templates for code, improving comprehension and maintainability.
   - **Features**:
     - Extracts key information from code comments and structure.
     - Creates clear and concise documentation templates.
     - Supports various documentation standards and formats (e.g., Javadoc, Doxygen).



3. **Code Debugger**
   - **Description**: An intelligent tool that identifies and helps resolve issues in code efficiently.
   - **Features**:
     - Detects syntax and logical errors in code.
     - Provides detailed error descriptions and potential fixes.
     - Integrates with popular development environments.

### Getting Started

#### Prerequisites
- Ensure you have the following software installed:
  - Python 3.x
  - Required libraries: `numpy`, `pandas`, `scikit-learn`, `nltk` (for natural language processing tasks)



#### Usage

1. **Conversion History**:
   - To start tracking conversion history, run the `conversion_history.py` script.
   ```sh
   python conversion_history.py
   ```

2. **Documentation Generator**:
   - Generate documentation by running the `doc_generator.py` script and specifying the source code directory.
   ```sh
   python doc_generator.py -s /path/to/source/code
   ```


3. **Code Debugger**:
   - Run the `code_debugger.py` script to identify and resolve issues in your code.
   ```sh
   python code_debugger.py -f /path/to/code/file
   ```

