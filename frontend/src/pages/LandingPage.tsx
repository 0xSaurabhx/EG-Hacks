import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

 const LandingPage = () => {
  return (
    <>
    <header className="flex items-center justify-between px-4 py-3 bg-gray-900 text-white shadow-md">
      <Link to={'/'} className="flex items-center" >
        <FlagIcon className="h-6 w-6 mr-2" />
        <span className="text-lg font-bold">Legacy Code Migrator</span>
      </Link>
      <nav className="hidden md:flex items-center space-x-4">
        <Link to={'/'} className="hover:underline" >
          Features
        </Link>
        <Link to={'/'} className="hover:underline" >
          Pricing
        </Link>
        <Link to={'/'} className="hover:underline" >
          Contact
        </Link>
        <Button>Sign In</Button>
      </nav>
      <Button className="md:hidden">
        <MenuIcon className="h-6 w-6" />
      </Button>
    </header>
    <main>
      <section className="bg-gray-900 text-white py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Modernize Your Legacy Code with Ease</h1>
            <p className="text-lg md:text-xl mb-8">
              Our AI-powered platform analyzes your legacy code, provides refactoring recommendations, and seamlessly
              deploys the updated codebase.
            </p>
            <Button variant="primary">Get Started</Button>
          </div>
          <div>
            <img
              alt="Legacy Code Migration"
              className="rounded-lg"
              height="400"
              src="/placeholder.svg"
              style={{
                aspectRatio: "600/400",
                objectFit: "cover",
              }}
              width="600"
            />
          </div>
        </div>
      </section>
      <section className="py-20 md:py-32 bg-gray-100 dark:bg-gray-800" id="features">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Features</h2>
            <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400">
              Streamline your legacy code migration with our powerful tools.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md p-6">
              <CodeIcon className="h-12 w-12 text-gray-500 dark:text-gray-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Automated Code Analysis</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Our AI-powered engine analyzes your legacy codebase and identifies areas for improvement.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md p-6">
              <RedoIcon className="h-12 w-12 text-gray-500 dark:text-gray-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Refactoring Recommendations</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Get tailored refactoring suggestions to modernize your legacy code and improve maintainability.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md p-6">
              <CommandIcon />
              <h3 className="text-xl font-bold mb-2">Seamless Deployment</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Our platform handles the entire migration process, ensuring a smooth transition to the updated
                codebase.
              </p>
            </div>
          </div>
        </div>
      </section>
     
      <section className="py-20 md:py-32" id="contact">
        <div className="container mx-auto px-4 md:px-8">
          <div className="bg-gray-900 text-white rounded-lg shadow-md p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
                <p className="text-lg md:text-xl mb-8">Have questions or need help? Contact our team.</p>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="John Doe" type="text" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="john@example.com" type="email" />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="How can we help you?" rows={4} />
                  </div>
                  <Button type="submit" variant="primary">
                    Submit
                  </Button>
                </form>
              </div>
              <div className="flex items-center justify-center">
                <img
                  alt="Contact Us"
                  className="rounded-lg"
                  height="400"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "400/400",
                    objectFit: "cover",
                  }}
                  width="400"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center">
          <FlagIcon className="h-6 w-6 mr-2" />
          <span className="text-lg font-bold">Legacy Code Migrator</span>
        </div>
        <nav className="flex items-center space-x-4 mt-4 md:mt-0">
          <Link to={'/'} className="hover:underline" >
            Privacy Policy
          </Link>
          <Link  to={'/'} className="hover:underline">
            Terms of Service
          </Link>
          <Link to={'/'} className="hover:underline">
            Contact Us
          </Link>
        </nav>
      </div>
    </footer>
  </>
)
}

function CheckIcon(props) {
return (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
)
}


function CodeIcon(props) {
return (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
)
}


function CommandIcon(props) { 
    return (
    <svg
    {...props}  xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    >
   
    </svg>
    )
}

function FlagIcon(props) {
return (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
    <line x1="4" x2="4" y1="22" y2="15" />
  </svg>
)
}


function MenuIcon(props) {
return (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
)
}


function RedoIcon(props) {
return (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 7v6h-6" />
    <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7" />
  </svg>
)
}


function XIcon(props) {
return (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
)
}
export default LandingPage