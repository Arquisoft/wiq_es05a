package wiq5a

import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class GameSimulation extends Simulation {

  private val httpProtocol = http
    .baseUrl("http://localhost:8000")
    .inferHtmlResources(AllowList(), DenyList(""".*\.js""", """.*\.css""", """.*\.gif""", """.*\.jpeg""", """.*\.jpg""", """.*\.ico""", """.*\.woff""", """.*\.woff2""", """.*\.(t|o)tf""", """.*\.png""", """.*\.svg""", """.*detectportal\.firefox\.com.*"""))
    .acceptHeader("application/json, text/plain, */*")
    .acceptEncodingHeader("gzip, deflate, br")
    .acceptLanguageHeader("es,es-419;q=0.9,en;q=0.8")
    .userAgentHeader("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36")
  
  private val headers_0 = Map(
  		"Accept" -> "*/*",
  		"Access-Control-Request-Headers" -> "content-type",
  		"Access-Control-Request-Method" -> "POST",
  		"Origin" -> "http://localhost:3000",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "same-site"
  )
  
  private val headers_1 = Map(
  		"Content-Type" -> "application/json",
  		"Origin" -> "http://localhost:3000",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "same-site",
  		"sec-ch-ua" -> """Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99""",
  		"sec-ch-ua-mobile" -> "?0",
  		"sec-ch-ua-platform" -> "Windows"
  )
  
  private val headers_2 = Map(
  		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
  		"If-None-Match" -> """W/"885-Aj9FRaNpP63wyALUYdkAE8C3EK4"""",
  		"Sec-Fetch-Dest" -> "document",
  		"Sec-Fetch-Mode" -> "navigate",
  		"Sec-Fetch-Site" -> "same-origin",
  		"Sec-Fetch-User" -> "?1",
  		"Upgrade-Insecure-Requests" -> "1",
  		"sec-ch-ua" -> """Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99""",
  		"sec-ch-ua-mobile" -> "?0",
  		"sec-ch-ua-platform" -> "Windows"
  )
  
  private val headers_3 = Map(
  		"Accept" -> "*/*",
  		"If-Modified-Since" -> "Thu, 01 Feb 2024 10:54:02 GMT",
  		"If-None-Match" -> """W/"205-18d644de418"""",
  		"Sec-Fetch-Dest" -> "manifest",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "same-origin",
  		"sec-ch-ua" -> """Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99""",
  		"sec-ch-ua-mobile" -> "?0",
  		"sec-ch-ua-platform" -> "Windows"
  )
  
  private val headers_4 = Map(
  		"If-None-Match" -> """W/"71-8jI72sbn033JyY2xVLPWtBSANWU"""",
  		"Origin" -> "http://localhost:3000",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "same-site",
  		"sec-ch-ua" -> """Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99""",
  		"sec-ch-ua-mobile" -> "?0",
  		"sec-ch-ua-platform" -> "Windows"
  )
  
  private val headers_5 = Map(
  		"If-None-Match" -> """W/"c8-X78SiD3Yt+RTa31PgN78a2PXNzU"""",
  		"Origin" -> "http://localhost:3000",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "same-site",
  		"sec-ch-ua" -> """Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99""",
  		"sec-ch-ua-mobile" -> "?0",
  		"sec-ch-ua-platform" -> "Windows"
  )
  
  private val headers_6 = Map(
  		"If-None-Match" -> """W/"9e-sF6NoXk217bfZMPS6sGOSa97dcg"""",
  		"Origin" -> "http://localhost:3000",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "same-site",
  		"sec-ch-ua" -> """Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99""",
  		"sec-ch-ua-mobile" -> "?0",
  		"sec-ch-ua-platform" -> "Windows"
  )
  
  private val headers_7 = Map(
  		"If-None-Match" -> """W/"c9-fZ3Rd5epPtc88+c6XkoQyNL7XZo"""",
  		"Origin" -> "http://localhost:3000",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "same-site",
  		"sec-ch-ua" -> """Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99""",
  		"sec-ch-ua-mobile" -> "?0",
  		"sec-ch-ua-platform" -> "Windows"
  )
  
  private val headers_8 = Map(
  		"If-None-Match" -> """W/"ad-Yp4RCM2QP7FuhQ/R5wgzyvL98Jc"""",
  		"Origin" -> "http://localhost:3000",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "same-site",
  		"sec-ch-ua" -> """Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99""",
  		"sec-ch-ua-mobile" -> "?0",
  		"sec-ch-ua-platform" -> "Windows"
  )
  
  private val headers_9 = Map(
  		"If-None-Match" -> """W/"6b-WIi4KU/MK7deovLWKYAf9gMmrck"""",
  		"Origin" -> "http://localhost:3000",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "same-site",
  		"sec-ch-ua" -> """Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99""",
  		"sec-ch-ua-mobile" -> "?0",
  		"sec-ch-ua-platform" -> "Windows"
  )
  
  private val headers_10 = Map(
  		"If-None-Match" -> """W/"8e-PceiSRZRyMm8uidq07M7SHF+Zlk"""",
  		"Origin" -> "http://localhost:3000",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "same-site",
  		"sec-ch-ua" -> """Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99""",
  		"sec-ch-ua-mobile" -> "?0",
  		"sec-ch-ua-platform" -> "Windows"
  )
  
  private val headers_11 = Map(
  		"If-None-Match" -> """W/"7f-T+l8vKxS3Mif+W7IMZO9koQOg5I"""",
  		"Origin" -> "http://localhost:3000",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "same-site",
  		"sec-ch-ua" -> """Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99""",
  		"sec-ch-ua-mobile" -> "?0",
  		"sec-ch-ua-platform" -> "Windows"
  )
  
  private val headers_12 = Map(
  		"If-None-Match" -> """W/"93-gRClJbHmjYfvypA1603B42F7HbM"""",
  		"Origin" -> "http://localhost:3000",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "same-site",
  		"sec-ch-ua" -> """Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99""",
  		"sec-ch-ua-mobile" -> "?0",
  		"sec-ch-ua-platform" -> "Windows"
  )
  
  private val headers_13 = Map(
  		"If-None-Match" -> """W/"a3-kAM2G5YE2z8l4YOxuJtrB44Gvmc"""",
  		"Origin" -> "http://localhost:3000",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "same-site",
  		"sec-ch-ua" -> """Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99""",
  		"sec-ch-ua-mobile" -> "?0",
  		"sec-ch-ua-platform" -> "Windows"
  )
  
  private val headers_14 = Map(
  		"If-None-Match" -> """W/"a2-wsVhJwMgQ0r71cgEm58vOIyHjSE"""",
  		"Origin" -> "http://localhost:3000",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "same-site",
  		"sec-ch-ua" -> """Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99""",
  		"sec-ch-ua-mobile" -> "?0",
  		"sec-ch-ua-platform" -> "Windows"
  )
  
  private val headers_15 = Map(
  		"If-None-Match" -> """W/"67-I66Xd5LQF/MBR+j6irPjLwZVj9Q"""",
  		"Origin" -> "http://localhost:3000",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "same-site",
  		"sec-ch-ua" -> """Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99""",
  		"sec-ch-ua-mobile" -> "?0",
  		"sec-ch-ua-platform" -> "Windows"
  )
  
  private val headers_16 = Map(
  		"If-None-Match" -> """W/"98-mUp9T1nn/GzcWHCw8sfSUh0rrz4"""",
  		"Origin" -> "http://localhost:3000",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "same-site",
  		"sec-ch-ua" -> """Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99""",
  		"sec-ch-ua-mobile" -> "?0",
  		"sec-ch-ua-platform" -> "Windows"
  )
  
  private val headers_17 = Map(
  		"If-None-Match" -> """W/"8f-TW+f2kop6y8vP901RrH2KlG+aXw"""",
  		"Origin" -> "http://localhost:3000",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "same-site",
  		"sec-ch-ua" -> """Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99""",
  		"sec-ch-ua-mobile" -> "?0",
  		"sec-ch-ua-platform" -> "Windows"
  )
  
  private val headers_18 = Map(
  		"If-None-Match" -> """W/"bb-X2ovTv43Tw4lgdzRszgCwSvBzq0"""",
  		"Origin" -> "http://localhost:3000",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "same-site",
  		"sec-ch-ua" -> """Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99""",
  		"sec-ch-ua-mobile" -> "?0",
  		"sec-ch-ua-platform" -> "Windows"
  )
  
  private val headers_19 = Map(
  		"If-None-Match" -> """W/"68-JMi01VCJym+fPyTi4nWKDw0Fwes"""",
  		"Origin" -> "http://localhost:3000",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "same-site",
  		"sec-ch-ua" -> """Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99""",
  		"sec-ch-ua-mobile" -> "?0",
  		"sec-ch-ua-platform" -> "Windows"
  )
  
  private val headers_20 = Map(
  		"If-None-Match" -> """W/"74-b3zoATCQKAxKPLTq9mQC+ZC+lSg"""",
  		"Origin" -> "http://localhost:3000",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "same-site",
  		"sec-ch-ua" -> """Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99""",
  		"sec-ch-ua-mobile" -> "?0",
  		"sec-ch-ua-platform" -> "Windows"
  )
  
  private val headers_21 = Map(
  		"If-None-Match" -> """W/"67-+nSMZouhcoZGxnBb6/FH1FpkKFo"""",
  		"Origin" -> "http://localhost:3000",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "same-site",
  		"sec-ch-ua" -> """Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99""",
  		"sec-ch-ua-mobile" -> "?0",
  		"sec-ch-ua-platform" -> "Windows"
  )
  
  private val headers_22 = Map(
  		"If-None-Match" -> """W/"91-LtlQs7oO8gSpT7VpLTO654Zr4dc"""",
  		"Origin" -> "http://localhost:3000",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "same-site",
  		"sec-ch-ua" -> """Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99""",
  		"sec-ch-ua-mobile" -> "?0",
  		"sec-ch-ua-platform" -> "Windows"
  )
  
  private val headers_23 = Map(
  		"If-None-Match" -> """W/"8e-5T+1AflWKuUBUTZmy21bY/L2byA"""",
  		"Origin" -> "http://localhost:3000",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "same-site",
  		"sec-ch-ua" -> """Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99""",
  		"sec-ch-ua-mobile" -> "?0",
  		"sec-ch-ua-platform" -> "Windows"
  )
  
  private val headers_24 = Map(
  		"Origin" -> "http://localhost:3000",
  		"Sec-Fetch-Dest" -> "empty",
  		"Sec-Fetch-Mode" -> "cors",
  		"Sec-Fetch-Site" -> "same-site",
  		"sec-ch-ua" -> """Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99""",
  		"sec-ch-ua-mobile" -> "?0",
  		"sec-ch-ua-platform" -> "Windows"
  )
  
  private val uri1 = "localhost"

  private val scn = scenario("GameSimulation")
    .exec(
      http("request_0")
        .options("/login")
        .headers(headers_0)
        .resources(
          http("request_1")
            .post("/login")
            .headers(headers_1)
            .body(RawFileBody("wiq5a/gamesimulation/0001_request.json"))
        ),
      pause(1),
      http("request_2")
        .get("http://" + uri1 + ":3000/game")
        .headers(headers_2)
        .resources(
          http("request_3")
            .get("http://" + uri1 + ":3000/manifest.json")
            .headers(headers_3),
          http("request_4")
            .get("/pregunta")
            .headers(headers_4),
          http("request_5")
            .get("/pregunta")
            .headers(headers_5),
          http("request_6")
            .get("/pregunta")
            .headers(headers_6),
          http("request_7")
            .get("/pregunta")
            .headers(headers_7),
          http("request_8")
            .get("/pregunta")
            .headers(headers_8),
          http("request_9")
            .get("/pregunta")
            .headers(headers_9),
          http("request_10")
            .get("/pregunta")
            .headers(headers_10),
          http("request_11")
            .get("/pregunta")
            .headers(headers_11),
          http("request_12")
            .get("/pregunta")
            .headers(headers_12),
          http("request_13")
            .get("/pregunta")
            .headers(headers_13),
          http("request_14")
            .get("/pregunta")
            .headers(headers_14),
          http("request_15")
            .get("/pregunta")
            .headers(headers_15),
          http("request_16")
            .get("/pregunta")
            .headers(headers_16),
          http("request_17")
            .get("/pregunta")
            .headers(headers_17),
          http("request_18")
            .get("/pregunta")
            .headers(headers_18),
          http("request_19")
            .get("/pregunta")
            .headers(headers_19),
          http("request_20")
            .get("/pregunta")
            .headers(headers_20),
          http("request_21")
            .get("/pregunta")
            .headers(headers_21),
          http("request_22")
            .get("/pregunta")
            .headers(headers_22),
          http("request_23")
            .get("/pregunta")
            .headers(headers_23)
        ),
      pause(15),
      http("request_24")
        .get("/updateStats?username=ferjota&numRespuestasCorrectas=2&numRespuestasIncorrectas=8")
        .headers(headers_24)
    )

	setUp(scn.inject(atOnceUsers(10))).protocols(httpProtocol)
}
