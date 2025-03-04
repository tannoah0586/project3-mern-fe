const Landing = () => {
  return (
      <main className="pt-20">
          <div className="max-w-4xl mx-auto p-4">
              <section className="text-center mb-16">
                  <img src="/placeholder-logo.png" alt="Company Feedback & Idea Collaboration App" className="mx-auto mb-4" />
                  <h1 className="text-4xl font-bold mb-4">Collaborate & Innovate with Difference</h1>
                  <p className="text-lg text-gray-600">Transform your company's feedback and idea generation with our intuitive platform.</p>
              </section>

              <section className="mb-16">
                  <header className="text-center mb-8">
                      <h3 className="text-sm uppercase text-gray-500 mb-2">ABOUT OUR PLATFORM</h3>
                      <h2 className="text-3xl font-bold">Unleash Collective Intelligence</h2>
                  </header>
                  <article className="text-lg text-gray-700 space-y-4">
                      <p>Idea is designed to empower your team to share, discuss, and develop innovative ideas. We provide a seamless platform for capturing valuable feedback, fostering collaboration, and driving meaningful change within your organization.</p>
                      <p>Whether you're looking to improve internal processes, enhance product development, or simply encourage open communication, Idea offers the tools you need to succeed. Join a community where every voice matters, and every idea has the potential to shape the future.</p>
                  </article>
              </section>

              <section className="mb-16">
                  <header className="text-center mb-8">
                      <h3 className="text-sm uppercase text-gray-500 mb-2">KEY FEATURES</h3>
                      <h2 className="text-3xl font-bold">Why Choose Idea?</h2>
                  </header>
                  <article className="text-lg text-gray-700">
                      <ul className="list-disc list-inside space-y-2">
                          <li><strong>Idea Sharing:</strong> Easily submit and share your ideas with colleagues.</li>
                          <li><strong>Feedback Collection:</strong> Gather constructive feedback to refine and improve concepts.</li>
                          <li><strong>Collaborative Discussions:</strong> Engage in meaningful conversations and build upon each other's ideas.</li>
                          <li><strong>Voting & Prioritization:</strong> Identify the most promising ideas through voting and prioritization.</li>
                          <li><strong>Anonymity Options:</strong> Enable honest feedback with customizable anonymity settings.</li>
                      </ul>
                  </article>
              </section>

              <section className="mb-16">
                  <header className="text-center mb-8">
                      <h3 className="text-sm uppercase text-gray-500 mb-2">WHAT OUR USERS SAY</h3>
                      <h2 className="text-3xl font-bold">TESTIMONIALS</h2>
                  </header>
                  <article className="border rounded-lg p-6 mb-4">
                      <header className="mb-2">
                          <h4 className="font-semibold">Sarah Chen</h4>
                          <p className="text-sm text-gray-600">Innovation Manager</p>
                      </header>
                      <p className="text-gray-700 mb-2">Idea has revolutionized how we collect and process feedback. The ability to anonymously share ideas has significantly increased participation and brought forward valuable insights we wouldn't have otherwise captured.</p>
                      <footer className="flex justify-center">
                          <img src="/five-stars.png" alt="Five gold stars" className="h-6" />
                      </footer>
                  </article>

                  <article className="border rounded-lg p-6">
                      <header className="mb-2">
                          <h4 className="font-semibold">David Lee</h4>
                          <p className="text-sm text-gray-600">Team Lead, Product Development</p>
                      </header>
                      <p className="text-gray-700 mb-2">The collaborative discussions and voting features have streamlined our idea prioritization process. Idea has become an essential tool for driving innovation within our team.</p>
                      <footer className="flex justify-center">
                          <img src="/five-stars.png" alt="Five gold stars" className="h-6" />
                      </footer>
                  </article>
              </section>

              <section className="text-center mb-16">
                  <header className="mb-8">
                      <h2 className="text-3xl font-bold">Ready to Transform Your Company's Feedback?</h2>
                  </header>
                  <article>
                      <p className="text-lg text-gray-700 mb-4">Join Idea today and start building a culture of innovation and collaboration.</p>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full">Get Started Now</button>
                  </article>
              </section>
          </div>

          <footer className="text-center py-4 bg-gray-100">
              © 2025 Idea INC. ALL RIGHTS RESERVED.
          </footer>
      </main>
  );
};

export default Landing;