import React from "react";

export default function OverEngineeredArchitecture() {
  return (
    <>
      <p className="articleLead">
        For years, web servers carried an assumption that felt obvious:
      </p>

      <blockquote>
        <p>To hold a connection open, you need a thread sitting with it.</p>
      </blockquote>

      <p>Apache followed that model. One connection, one thread. If 100 users were connected, 100 threads waited. If 10,000 users were connected, 10,000 threads waited.</p>

      <p>At small scale, this felt simple.</p>
      <p>At large scale, it became wasteful.</p>

      <p>
        Most of those threads were not doing useful work. They were just waiting. Each thread
        carried memory overhead, scheduler overhead, and context-switching cost. The server was
        not slow because every thread was busy. It was slow because too many threads existed
        only to represent inactivity.
      </p>

      <p>Nginx changed the question.</p>

      <p>It did not ask:</p>
      <blockquote>
        <p>How do we create more threads?</p>
      </blockquote>

      <p>It asked:</p>
      <blockquote>
        <p>Why does waiting need a thread at all?</p>
      </blockquote>

      <p>That was the key shift.</p>

      <p>A connection needs state: a file descriptor, buffers, flags, and information about where it is in the request lifecycle. But it does not need a dedicated operating-system thread while it is idle.</p>

      <p>Nginx separated the connection from the thread.</p>

      <p>It applied the same logic to file serving. The naive path reads a file from disk into kernel memory, copies it into application memory, then copies it again into the socket buffer. Linux&apos;s <code>sendfile()</code> syscall removes the middle step: the kernel can send bytes from the page cache to the network without copying them through application memory.</p>

      <p>At millions of requests per second, that is not a micro-optimization. It is the difference between architecture that respects the real unit of work and architecture that pays for steps that add nothing.</p>

      <p>That idea is bigger than web servers.</p>

      <p>A thread is not a connection.</p>
      <p>A service is not a module.</p>
      <p>A load balancer is not always a separate box.</p>
      <p>And architecture is not better just because it is more distributed.</p>

      <h2>The same mistake moved up the stack</h2>

      <p>Infrastructure made a similar assumption:</p>
      <blockquote>
        <p>If traffic needs to be distributed, there must be a dedicated load balancer in the middle.</p>
      </blockquote>

      <p>For a long time, that was the right answer.</p>

      <p>
        A load balancer gives you one front door. One place for TLS termination. One place for
        health checks. One place to decide which backend should receive traffic.
      </p>

      <p>But modern systems are different.</p>

      <p>One application becomes hundreds of services. One cluster becomes many clusters. One region becomes three. Every service wants routing rules, retries, observability, failover, and sometimes its own load balancer.</p>

      <p>At that point, the load balancer stops being only a clean abstraction.</p>
      <p>It becomes a tax.</p>

      <p>The problem is not load balancing. Load balancing is necessary.</p>

      <p>The problem is assuming every routing decision needs a separate middlebox.</p>

      <p>
        Cloudflare is a useful example. It replaced parts of its NGINX-based proxy infrastructure with Pingora, a Rust-based proxy built for its own scale. Cloudflare said Pingora handled over one trillion requests per day while using about one third of the CPU and memory of its previous proxy infrastructure.{" "}
        <a
          href="https://blog.cloudflare.com/how-we-built-pingora-the-proxy-that-connects-cloudflare-to-the-internet/"
          target="_blank"
          rel="noopener noreferrer"
        >
          (The Cloudflare Blog)
        </a>
      </p>

      <p>
        This does not mean NGINX is bad. NGINX solved the right problem for its time.
      </p>

      <p>It means even successful architectures eventually encounter constraints that force their old assumptions back into question.</p>

      <p>At some point, the question changes from:</p>
      <blockquote>
        <p>Which load balancer or proxy should we use?</p>
      </blockquote>

      <p>to:</p>
      <blockquote>
        <p>Why is this traffic crossing this layer at all?</p>
      </blockquote>

      <h2>Load balancing is becoming less like a box</h2>

      <p>The modern direction is not &ldquo;load balancers are dead.&rdquo;</p>
      <p>That is too dramatic and technically wrong.</p>

      <p>A better way to say it is:</p>
      <blockquote>
        <p>Load balancing is moving closer to where traffic already is.</p>
      </blockquote>

      <p>Sometimes that means a custom proxy like Pingora.</p>
      <p>Sometimes it means Kubernetes-native networking.</p>
      <p>Sometimes it means eBPF inside the Linux kernel.</p>
      <p>Sometimes it means Gateway API, service mesh, or client-side routing.</p>

      <p>
        SmartNews gives a practical example. As their Kubernetes usage grew, they ran into
        kube-proxy scale problems and rising AWS load balancer costs. Their team evaluated
        options and selected Cilium because it could replace kube-proxy and use eBPF for more
        efficient networking.{" "}
        <a
          href="https://www.cncf.io/case-studies/smartnews/"
          target="_blank"
          rel="noopener noreferrer"
        >
          (CNCF)
        </a>
      </p>

      <p>
        Cilium&rsquo;s own documentation describes a kube-proxy-free mode where Cilium can
        replace kube-proxy for Kubernetes service handling.{" "}
        <a
          href="https://docs.cilium.io/en/stable/network/kubernetes/kubeproxy-free/"
          target="_blank"
          rel="noopener noreferrer"
        >
          (Cilium Documentation)
        </a>
      </p>

      <p>The routing decision still exists.</p>
      <p>But the dedicated middle layer may not always need to.</p>

      <p>A load balancer is not a machine.</p>
      <p>It is a decision.</p>
      <p>And decisions can move.</p>

      <h2>The CDN edge teaches the same lesson</h2>

      <p>
        <a
          href="https://4shutosh.com/cheap-cdn"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ashutosh Singh&apos;s writing on CDN economics
        </a>{" "}
        makes a useful point: &quot;closer to the user&quot; is the obvious explanation for why CDNs are cheaper, but not the deepest one.
      </p>

      <p>Geography matters. When an origin in Mumbai serves a user in London, the request crosses expensive long-haul transit on every hit. A CDN still pays that cost once to pull content from origin and warm the cache. After that, thousands of London users are served locally. The expensive trip is amortized, not repeated per user.</p>

      <p>But the deeper difference is that an origin server and a CDN node are built for different jobs.</p>

      <p>On an origin request, the CPU may authenticate the user, query a database, run business logic, assemble a response, and send it back.</p>

      <p>On a CDN cache hit, the common case is simpler: find the object in cache and stream bytes to the socket.</p>

      <p>No database.</p>
      <p>No application logic.</p>
      <p>No repeated origin compute.</p>
      <p>Just movement.</p>

      <p>So the hardware budget flips. An origin might need more compute. A CDN node can spend more of its budget on storage and network throughput. Spend follows the bottleneck.</p>

      <p>CDN nodes also tier cache by access frequency. Hot content sits in RAM. Warm content lives on NVMe. Cold long-tail content moves to cheaper disks. You do not spend premium storage on a file requested once a week.</p>

      <p>At extreme scale, the bottleneck moves again. Each packet arrival can trigger an OS interrupt and a trip through the kernel network stack. That is fine at moderate throughput. At very high throughput, the cost of merely notifying the CPU becomes its own tax.</p>

      <p>That is why high-throughput systems sometimes push work closer to the hardware. Kernel bypass frameworks like DPDK let applications poll the NIC directly and avoid parts of the normal kernel path. Cloudflare has written about using this kind of approach in production. (The Cloudflare Blog)</p>

      <p>The tradeoff is deliberate. A polling core can burn CPU even at zero traffic, but above a certain throughput, that can be cheaper than interrupt storms.</p>

      <p>The same idea shows up in NUMA locality. Modern servers often have multiple CPU sockets, each with its own memory bank. If the NIC is attached to one socket but cached content sits in memory attached to another, every transfer pays a cross-socket penalty. CDN operators try to keep NICs, worker threads, and memory close to each other.</p>

      <p>Again, the lesson is not just &quot;move closer to the user.&quot;</p>

      <p>The deeper lesson is:</p>
      <blockquote>
        <p>Do not run origin-server assumptions on a byte-serving workload.</p>
      </blockquote>

      <h2>I saw the same thing in my own project</h2>

      <p>I saw this mistake while working on an EEG-based AI system.</p>

      <p>
        The project involved analyzing EEG signals from thousands of people and combining that
        brain activity with user actions. The goal was to build AI models that could predict
        behavior based on both EEG patterns and activity data.
      </p>

      <p>The system had many parts:</p>

      <ul>
        <li>Raw EEG ingestion</li>
        <li>Signal preprocessing</li>
        <li>Noise filtering</li>
        <li>Feature extraction</li>
        <li>Action-event mapping</li>
        <li>Behavior labeling</li>
        <li>Model training</li>
        <li>Inference</li>
        <li>Dashboards</li>
        <li>APIs</li>
      </ul>

      <p>A common temptation would be to make everything a microservice.</p>

      <p>One service for ingestion. One service for preprocessing. One service for feature extraction. One service for model training. One service for inference. One service for analytics.</p>

      <p>One API gateway in front. Load balancers between services. Queues everywhere. Retries everywhere. Monitoring everywhere.</p>

      <p>It sounds scalable.</p>
      <p>It also creates a lot of complexity before the system has earned it.</p>

      <p>
        But most of those boundaries were not real scaling boundaries. They were code boundaries
        pretending to be infrastructure boundaries.
      </p>

      <p>The hard part of the EEG system was not moving JSON between services.</p>

      <p>
        The hard part was preserving signal quality, aligning brain activity with user actions,
        handling noisy data, extracting reliable features, validating model behavior, and making
        predictions fast enough to be useful.
      </p>

      <p>Adding more services would not make the AI better.</p>
      <p>It would only add more failure modes.</p>

      <p>So the better design was a modular monolith.</p>

      <p>Not a messy monolith. Not one giant file. A modular monolith.</p>

      <p>Something like this:</p>

      <pre className="articleCode">
        <code>{`eeg-platform/
  ingestion/
  preprocessing/
  feature_extraction/
  behavior_mapping/
  model_training/
  inference/
  api/
  dashboards/
  shared/`}</code>
      </pre>

      <p>
        Each module had a clear responsibility. Each module had its own tests. Each module had
        its own interface. The preprocessing code did not casually reach into the inference code.
        The model training logic did not get mixed with dashboard logic.
      </p>

      <p>But the system deployed as one unit until there was a real reason to split it.</p>

      <p>The project needed modularity.</p>
      <p>It did not need premature distribution.</p>

      <h2>A module does not need a port number</h2>

      <p>This is where many teams over-engineer systems.</p>

      <p>They treat every conceptual boundary as a network boundary.</p>

      <p>But a module does not need a port number.</p>
      <p>A function call does not need a load balancer.</p>
      <p>A clean folder structure does not need a Kubernetes service.</p>

      <p>Microservices are useful when the boundaries are real.</p>

      <p>
        A part of the system may deserve to become a service when it has a different scaling
        pattern, different team ownership, different security requirement, different release
        cycle, or different infrastructure need.
      </p>

      <p>
        In the EEG system, model training might eventually become separate because it may need
        GPUs, long-running jobs, and experiment tracking. Real-time inference might become
        separate if it needs strict latency. Ingestion might split out if device traffic grows
        faster than the rest of the platform.
      </p>

      <p>Those are real reasons.</p>

      <p>
        But splitting early just because &ldquo;microservices scale better&rdquo; is usually
        architecture theater.
      </p>

      <p>You do not get scalability for free.</p>

      <p>
        You pay for it with network calls, timeouts, retries, schema versioning, deployment
        complexity, distributed tracing, load balancing, and debugging pain.
      </p>

      <p>A modular monolith says:</p>
      <blockquote>
        <p>Keep boundaries in code until reality forces them into infrastructure.</p>
      </blockquote>

      <p>That is the same lesson Nginx taught at the connection layer.</p>

      <p>Nginx did not say threads are useless.</p>
      <p>It said idle connections do not deserve dedicated threads.</p>

      <p>A modular monolith does not say services are useless.</p>
      <p>It says internal modules do not deserve dedicated infrastructure until they earn it.</p>

      <h2>The pattern underneath all of this</h2>

      <p>The deeper pattern is simple:</p>
      <blockquote>
        <p>Do not pay runtime cost for conceptual separation.</p>
      </blockquote>

      <p>Apache paid for waiting with threads.</p>
      <p>Nginx kept the state and removed the unnecessary thread.</p>

      <p>
        Traditional infrastructure often pays for routing with too many load-balancer layers.
      </p>

      <p>
        Modern systems are moving some of that routing into proxies, kernels, service meshes,
        Gateway APIs, and platform-native networking. Kubernetes itself has been moving toward
        Gateway API as a more expressive successor to older Ingress patterns; the Kubernetes
        project announced Ingress2Gateway 1.0 in March 2026 to help teams migrate toward Gateway
        API.{" "}
        <a
          href="https://kubernetes.io/blog/2026/03/20/ingress2gateway-1-0-release/"
          target="_blank"
          rel="noopener noreferrer"
        >
          (Kubernetes)
        </a>
      </p>

      <p>Application teams often pay for modularity with microservices.</p>

      <p>
        A modular monolith keeps the separation but removes the unnecessary network boundary.
      </p>

      <p>That is the real lesson.</p>

      <p>A thread is not a connection.</p>
      <p>A load balancer is not a routing decision.</p>
      <p>A service is not a module.</p>

      <p>Once you see this, architecture becomes easier to reason about.</p>

      <p>You stop asking:</p>
      <blockquote>
        <p>What is the most modern tool?</p>
      </blockquote>

      <p>You start asking:</p>
      <blockquote>
        <p>What is the actual unit of work?</p>
      </blockquote>

      <p>For Nginx, the unit of work was not an open connection. It was a ready event.</p>
      <p>For load balancing, the unit of work is not the appliance. It is the routing decision.</p>
      <p>
        For a CDN cache hit, the unit of work is not a full request lifecycle. It is moving cached
        bytes to a socket with as few copies, hops, and wake-ups as possible.
      </p>
      <p>
        For an EEG AI platform, the unit of work is not a microservice. It is the pipeline stage, the
        data contract, the model boundary, and the feedback loop.
      </p>

      <p>Good architecture is usually quieter than over-engineered architecture.</p>
      <p>It has fewer boxes. Fewer fake boundaries. Fewer moving parts pretending to solve problems that do not exist yet.</p>

      <p>The goal is not to build the most distributed system.</p>
      <p>The goal is to build the system where every boundary has earned its cost.</p>
    </>
  );
}
