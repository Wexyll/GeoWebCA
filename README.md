# GeoWebCA
CA1 - Geo Web Mapping

Images of Local site working:

Login Page
![image](https://user-images.githubusercontent.com/55672334/200960225-3efcc3a3-7850-4892-bb95-e864f3555a05.png)

Map
![image](https://user-images.githubusercontent.com/55672334/200960764-82cadd66-0ae3-40db-beb6-a8245eefafea.png)

Register
![image](https://user-images.githubusercontent.com/55672334/200960515-9cab7b3d-c29b-462d-93e3-0332b61d7c0a.png)

Login
![image](https://user-images.githubusercontent.com/55672334/200960608-75b9038f-4006-446c-8477-bc154618a493.png)

---

Digital Ocean Droplet

[This is the link to my website](https://www.aleckeane.xyz)

The website is down as when trying to get the droplet working I encountered multiple errors.
I had the Containers all up and running without any issues and had completed my full configuration.

![image](https://user-images.githubusercontent.com/55672334/200961227-ef1b4f38-5dc9-4a7a-aae9-f8feb282ceb3.png)

During my setup my nginx had errors with duplicate servers listening to the same port.

in etc/nginx/sites-available/default I had to comment out line 22 which was causing the error.

![image](https://user-images.githubusercontent.com/55672334/200961388-9925b6fe-2cd9-4cee-b87e-b548f0d7f6d7.png)

However after having finished this, wmap-pgadmin4 which is the name of the network alias for pgadmin was throwing an issue in etc/nginx/conf.d/server.conf

![image](https://user-images.githubusercontent.com/55672334/200961547-9c0a6491-8231-4de5-b8ea-76af8a03ca9f.png)

I remade the pgadmin container to confirm that it was working.
After this I tried both wmap_pgadmin4 and wmap-pgadmin4, however, neither of these worked as when I would run the command "nginx -t"

This error was still occuring, which was preventing me from running nginx in any way, which meant none of the traffic to my server could be routed inside of the docker container to my site

![image](https://user-images.githubusercontent.com/55672334/200961744-37375609-f71e-47a7-ad46-3becacb8dfa4.png)

I still have no idea as to how this error occurs. I have spoken with others and reviewed forms and documentation.
I attempted to make a resolver which also failed and I attempted to recreate the nginx setup of which I have all correct along with my ubuntu firewall which is configured for the traffic.

![image](https://user-images.githubusercontent.com/55672334/200961919-6f230126-336c-4331-a450-7f8ff3eb0a2f.png)

After multiple hours of attempting different fixes and tests and conversing with multiple individuals including Mark I could not come to a resolution.
Otherwise my site is fully operational locally and my Droplet setup is functional and entirely complete save for this one error which is causing the traffic to not flow correctly.
